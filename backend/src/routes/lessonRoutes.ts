import { Router } from 'express';
import { LessonController } from '../controllers/lessonController';
import { authenticate } from '../middleware/auth';

const router = Router();
const lessonController = new LessonController();

// All routes require authentication
router.use(authenticate);

router.get('/', lessonController.getAllLessons.bind(lessonController));
router.get('/:id', lessonController.getLessonById.bind(lessonController));
router.get('/:id/vocabulary', lessonController.getLessonVocabulary.bind(lessonController));
router.get('/:id/exercises', lessonController.getLessonExercises.bind(lessonController));
router.post('/:id/exercises/:exerciseId/submit', lessonController.submitExercise.bind(lessonController));

export default router;
