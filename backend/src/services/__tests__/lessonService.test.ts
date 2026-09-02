import { describe, it, expect, beforeAll } from '@jest/globals';
import {
  JLPT_LEVELS,
  deriveJlptLevel,
  isJlptLevel,
  lessonService,
} from '../lessonService';

describe('lessonService JLPT roadmap support', () => {
  beforeAll(async () => {
    await lessonService.loadLessons();
  });

  describe('deriveJlptLevel', () => {
    it('maps lessons 1-15 to N5', () => {
      expect(deriveJlptLevel(1)).toBe('N5');
      expect(deriveJlptLevel(15)).toBe('N5');
    });

    it('maps lessons 16-25 to N4', () => {
      expect(deriveJlptLevel(16)).toBe('N4');
      expect(deriveJlptLevel(25)).toBe('N4');
    });

    it('maps lessons 26-30 to N3, 31-35 to N2, and 36-40 to N1', () => {
      expect(deriveJlptLevel(26)).toBe('N3');
      expect(deriveJlptLevel(30)).toBe('N3');
      expect(deriveJlptLevel(31)).toBe('N2');
      expect(deriveJlptLevel(35)).toBe('N2');
      expect(deriveJlptLevel(36)).toBe('N1');
      expect(deriveJlptLevel(40)).toBe('N1');
    });
  });

  describe('isJlptLevel', () => {
    it('accepts every known JLPT level', () => {
      JLPT_LEVELS.forEach(level => expect(isJlptLevel(level)).toBe(true));
    });

    it('rejects unknown values', () => {
      expect(isJlptLevel('N6')).toBe(false);
      expect(isJlptLevel('n5')).toBe(false);
      expect(isJlptLevel('')).toBe(false);
    });
  });

  describe('loadLessons', () => {
    it('loads all 40 bundled lessons', () => {
      expect(lessonService.getAllLessons()).toHaveLength(40);
    });

    it('tags every loaded lesson with a valid jlptLevel', () => {
      lessonService.getAllLessons().forEach(lesson => {
        expect(isJlptLevel(lesson.jlptLevel)).toBe(true);
      });
    });

    it('consistently maps each lesson into the expanded JLPT roadmap', () => {
      lessonService.getAllLessons().forEach(lesson => {
        const expected = deriveJlptLevel(lesson.lessonNumber);
        expect(lesson.jlptLevel).toBe(expected);
      });
    });
  });

  describe('getLessonsByLevel', () => {
    it('returns only N5 lessons (1-15) for N5', () => {
      const n5Lessons = lessonService.getLessonsByLevel('N5');
      expect(n5Lessons).toHaveLength(15);
      expect(n5Lessons.every(lesson => lesson.lessonNumber <= 15)).toBe(true);
    });

    it('returns only N4 lessons (16-25) for N4', () => {
      const n4Lessons = lessonService.getLessonsByLevel('N4');
      expect(n4Lessons).toHaveLength(10);
      expect(n4Lessons.every(lesson => lesson.lessonNumber >= 16 && lesson.lessonNumber <= 25)).toBe(true);
    });

    it('returns the bundled N3, N2, and N1 lessons', () => {
      expect(lessonService.getLessonsByLevel('N3')).toHaveLength(5);
      expect(lessonService.getLessonsByLevel('N2')).toHaveLength(5);
      expect(lessonService.getLessonsByLevel('N1')).toHaveLength(5);
    });
  });
});
