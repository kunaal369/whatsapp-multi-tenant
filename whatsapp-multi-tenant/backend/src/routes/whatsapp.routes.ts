import { Router } from 'express';
import {
  generateQr,
  sendTextMessage,
  syncContacts,
  syncGroups
} from '../controllers/whatsapp.controller';
import { authenticate } from '../middlewares/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

/**
 * @swagger
 * /api/whatsapp/devices:
 *   post:
 *     summary: Generate QR code for WhatsApp session
 *     tags: [WhatsApp]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: QR code generated
 */
router.post('/devices', generateQr);

/**
 * @swagger
 * /api/whatsapp/send:
 *   post:
 *     summary: Send WhatsApp message to a user or group
 *     tags: [WhatsApp]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               session:
 *                 type: string
 *               chatId:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message sent
 */
router.post('/send', sendTextMessage);

/**
 * @swagger
 * /api/whatsapp/contacts:
 *   get:
 *     summary: Sync and return WhatsApp contacts
 *     tags: [WhatsApp]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contacts synced and returned
 */
router.get('/contacts', syncContacts);

/**
 * @swagger
 * /api/whatsapp/groups:
 *   get:
 *     summary: Sync and return WhatsApp groups
 *     tags: [WhatsApp]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Groups synced and returned
 */
router.get('/groups', syncGroups);


export default router;
