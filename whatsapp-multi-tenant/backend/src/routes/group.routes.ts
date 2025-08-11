// src/routes/group.routes.ts
import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { getAllGroups } from '../controllers/group.controller';

const router = Router();

router.use(authenticate);

// GET /api/groups/list
router.get('/list', getAllGroups);

export default router;
