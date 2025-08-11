import { Router, Response } from 'express';
import { authenticate, AuthenticatedRequest } from '../middlewares/auth';
import Message from '../models/message.model';

const router = Router();
router.use(authenticate);

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Get all messages for the authenticated tenant
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       401:
 *         description: Unauthorized (missing or invalid token)
 */
router.get('/', async (req: AuthenticatedRequest, res: Response) => {
  const messages = await Message.find({ tenantId: req.user?.tenantId }).sort({ createdAt: -1 });
  res.json(messages);
});

export default router;
