import { Router } from 'express';
import { ProgressController } from '../controllers/progressController';
import { authenticate } from '../middleware/auth';

const router = Router();
const progressController = new ProgressController();

// All routes require authentication
router.use(authenticate);

router.get('/', progressController.getUserProgress.bind(progressController));
router.post('/update', progressController.updateProgress.bind(progressController));
router.get('/stats', progressController.getStats.bind(progressController));

export default router;
