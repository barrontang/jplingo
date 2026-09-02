import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { JLPT_LEVELS, isJlptLevel, lessonService } from '../services/lessonService';

export class LessonController {
  async getAllLessons(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { level } = req.query;

      if (level !== undefined) {
        if (typeof level !== 'string' || !isJlptLevel(level.toUpperCase())) {
          res.status(400).json({
            success: false,
            error: `Invalid level. Must be one of: ${JLPT_LEVELS.join(', ')}`,
          });
          return;
        }

        const lessons = lessonService.getLessonsByLevel(level.toUpperCase() as (typeof JLPT_LEVELS)[number]);
        res.json({
          success: true,
          count: lessons.length,
          data: lessons,
        });
        return;
      }

      const lessons = lessonService.getAllLessons();
      res.json({
        success: true,
        count: lessons.length,
        data: lessons,
      });
    } catch (error) {
      next(error);
    }
  }

  async getLessonById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const lessonId = parseInt(req.params.id, 10);
      
      if (isNaN(lessonId)) {
        res.status(400).json({
          success: false,
          error: 'Invalid lesson ID',
        });
        return;
      }

      const lesson = lessonService.getLessonById(lessonId);
      
      if (!lesson) {
        res.status(404).json({
          success: false,
          error: 'Lesson not found',
        });
        return;
      }

      res.json({
        success: true,
        data: lesson,
      });
    } catch (error) {
      next(error);
    }
  }

  async getLessonVocabulary(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const lessonId = parseInt(req.params.id, 10);
      
      if (isNaN(lessonId)) {
        res.status(400).json({
          success: false,
          error: 'Invalid lesson ID',
        });
        return;
      }

      const vocabulary = lessonService.getVocabularyByLesson(lessonId);
      
      res.json({
        success: true,
        count: vocabulary.length,
        data: vocabulary,
      });
    } catch (error) {
      next(error);
    }
  }

  async getLessonExercises(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const lessonId = parseInt(req.params.id, 10);
      
      if (isNaN(lessonId)) {
        res.status(400).json({
          success: false,
          error: 'Invalid lesson ID',
        });
        return;
      }

      // TODO: Generate exercises from lesson data
      res.json({
        success: true,
        data: [],
        message: 'Exercise generation coming soon',
      });
    } catch (error) {
      next(error);
    }
  }

  async submitExercise(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      res.json({
        success: true,
        data: {
          correct: true,
          xp: 10,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
