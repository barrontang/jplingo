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

// Lessons 1-25 follow the original beginner roadmap, while lessons 26-40 add
// original in-app intermediate and advanced content. The JLPT mapping is still
// a defensible approximation rather than an authoritative certification syllabus.
function deriveJlptLevel(lessonNumber: number): JlptLevel {
  if (lessonNumber <= 15) return 'N5';
  if (lessonNumber <= 25) return 'N4';
  if (lessonNumber <= 30) return 'N3';
  if (lessonNumber <= 35) return 'N2';
  return 'N1';
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
        'lessons-21-25.json',     // Lessons 21-25
        'lessons-26-30.json',     // Lessons 26-30
        'lessons-31-35.json',     // Lessons 31-35
        'lessons-36-40.json'      // Lessons 36-40
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
