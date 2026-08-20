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
    it('loads all 25 bundled lessons', () => {
      expect(lessonService.getAllLessons()).toHaveLength(25);
    });

    it('tags every loaded lesson with a valid jlptLevel', () => {
      lessonService.getAllLessons().forEach(lesson => {
        expect(isJlptLevel(lesson.jlptLevel)).toBe(true);
      });
    });

    it('consistently maps lessons 1-15 to N5 and 16-25 to N4', () => {
      lessonService.getAllLessons().forEach(lesson => {
        const expected = lesson.lessonNumber <= 15 ? 'N5' : 'N4';
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
      expect(n4Lessons.every(lesson => lesson.lessonNumber >= 16)).toBe(true);
    });

    it('returns an empty list for levels with no bundled content yet', () => {
      expect(lessonService.getLessonsByLevel('N3')).toHaveLength(0);
      expect(lessonService.getLessonsByLevel('N2')).toHaveLength(0);
      expect(lessonService.getLessonsByLevel('N1')).toHaveLength(0);
    });
  });
});
