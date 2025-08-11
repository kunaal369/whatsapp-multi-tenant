import { Router, Response } from 'express';
import { authenticate, AuthenticatedRequest } from '../middlewares/auth';
import Contact from '../models/contact.model';

const router = Router();
router.use(authenticate);

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get all contacts for the authenticated tenant
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Unauthorized (missing or invalid token)
 */
router.get('/', async (req: AuthenticatedRequest, res: Response) => {
  const contacts = await Contact.find({ tenantId: req.user?.tenantId }).sort({ name: 1 });
  res.json(contacts);
});

export default router;
