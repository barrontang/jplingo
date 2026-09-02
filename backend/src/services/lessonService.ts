import { promises as fs } from 'fs';
import path from 'path';

interface Vocabulary {
  japanese: string;
  hiragana: string;
  romaji: string;
  english: string;
  partOfSpeech: string;
}

interface GrammarPoint {
  title: string;
  explanation: string;
  examples: string[];
}

// JLPT roadmap levels, ordered from easiest to hardest.
const JLPT_LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'] as const;
type JlptLevel = (typeof JLPT_LEVELS)[number];

interface Lesson {
  lessonNumber: number;
  title: string;
  titleJapanese: string;
  description: string;
  difficulty: number;
  xpReward: number;
  order: number;
  isUnlocked: boolean;
  jlptLevel: JlptLevel;
  grammarPoints: GrammarPoint[];
  vocabulary: Vocabulary[];
}

// The bundled lessons are adapted from Minna No Nihongo Book I (lessons 1-25).
// That book is not aligned 1:1 with official JLPT syllabuses, so this mapping is
// a defensible approximation rather than an authoritative JLPT certification:
// lessons 1-15 cover the core elementary grammar generally associated with N5,
// while lessons 16-25 introduce more complex structures (て-form requests,
// giving/receiving, experience, volitional form, opinions) that trend toward N4.
function deriveJlptLevel(lessonNumber: number): JlptLevel {
  return lessonNumber <= 15 ? 'N5' : 'N4';
}

function isJlptLevel(value: string): value is JlptLevel {
  return (JLPT_LEVELS as readonly string[]).includes(value);
}

class LessonService {
  private lessons: Lesson[] = [];
  private loaded = false;

  async loadLessons(): Promise<void> {
    if (this.loaded) return;

    try {
      const dataDir = path.join(__dirname, '../data');
      
      // Load all lesson files
      const lessonFiles = [
        'lessons.json',           // Lessons 1-5
        'lessons-6-10.json',      // Lessons 6-10
        'lessons-11-15.json',     // Lessons 11-15
        'lessons-16-20.json',     // Lessons 16-20
        'lessons-21-25.json'      // Lessons 21-25
      ];

      const allLessons: Lesson[] = [];

      for (const file of lessonFiles) {
        const filePath = path.join(dataDir, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const lessons = JSON.parse(fileContent) as Lesson[];
        allLessons.push(...lessons);
      }

      // Tag each lesson with its JLPT roadmap level so consistent N5/N4 labels
      // are applied even if the source JSON files don't define one.
      const taggedLessons = allLessons.map(lesson => ({
        ...lesson,
        jlptLevel: lesson.jlptLevel && isJlptLevel(lesson.jlptLevel)
          ? lesson.jlptLevel
          : deriveJlptLevel(lesson.lessonNumber),
      }));

      // Sort by lesson number
      this.lessons = taggedLessons.sort((a, b) => a.lessonNumber - b.lessonNumber);
      this.loaded = true;

      console.log(`✅ Loaded ${this.lessons.length} lessons successfully`);
    } catch (error) {
      console.error('Error loading lessons:', error);
      throw new Error('Failed to load lesson data');
    }
  }

  getAllLessons(): Lesson[] {
    return this.lessons;
  }

  getLessonByNumber(lessonNumber: number): Lesson | undefined {
    return this.lessons.find(lesson => lesson.lessonNumber === lessonNumber);
  }

  getLessonById(id: number): Lesson | undefined {
    // For database compatibility, treat id as lesson number
    return this.getLessonByNumber(id);
  }

  getVocabularyByLesson(lessonNumber: number): Vocabulary[] {
    const lesson = this.getLessonByNumber(lessonNumber);
    return lesson?.vocabulary || [];
  }

  getGrammarByLesson(lessonNumber: number): GrammarPoint[] {
    const lesson = this.getLessonByNumber(lessonNumber);
    return lesson?.grammarPoints || [];
  }

  getLessonsByDifficulty(difficulty: number): Lesson[] {
    return this.lessons.filter(lesson => lesson.difficulty === difficulty);
  }

  getLessonsByLevel(level: JlptLevel): Lesson[] {
    return this.lessons.filter(lesson => lesson.jlptLevel === level);
  }

  getUnlockedLessons(): Lesson[] {
    return this.lessons.filter(lesson => lesson.isUnlocked);
  }

  // Unlock the next lesson after completing current one
  unlockNextLesson(currentLessonNumber: number): Lesson | null {
    const nextLesson = this.lessons.find(
      lesson => lesson.lessonNumber === currentLessonNumber + 1
    );
    
    if (nextLesson) {
      nextLesson.isUnlocked = true;
      return nextLesson;
    }
    
    return null;
  }
}

// Export singleton instance
export const lessonService = new LessonService();
export type { Lesson, Vocabulary, GrammarPoint, JlptLevel };
export { JLPT_LEVELS, isJlptLevel, deriveJlptLevel };
