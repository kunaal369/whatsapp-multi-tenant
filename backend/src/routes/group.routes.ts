import { Router, Response } from 'express';
import { authenticate, AuthenticatedRequest } from '../middlewares/auth';
import ChatGroup from '../models/chatGroup.model';

const router = Router();
router.use(authenticate);

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Get all WhatsApp chat groups for the authenticated tenant
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of chat groups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChatGroup'
 *       401:
 *         description: Unauthorized (missing or invalid token)
 */
router.get('/', async (req: AuthenticatedRequest, res: Response) => {
  const groups = await ChatGroup.find({ tenantId: req.user?.tenantId }).sort({ name: 1 });
  res.json(groups);
});

export default router;
