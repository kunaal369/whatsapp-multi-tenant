// import { Router } from 'express';
// import { authenticate } from '../middlewares/auth';
// import { authorize } from '../middlewares/permissions';
// import {
//   generateQr,
//   sendTextMessage,
//   syncContacts,
//   syncGroups,
// } from '../controllers/whatsapp.controller';

// const router = Router();

// /**
//  * @swagger
//  * tags:
//  *   name: WhatsApp
//  *   description: WhatsApp integration and messaging
//  */

// router.use(authenticate);

// /**
//  * @swagger
//  * /api/whatsapp/devices:
//  *   post:
//  *     summary: Generate WhatsApp QR for device login
//  *     tags: [WhatsApp]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: QR code data returned
//  *       403:
//  *         description: Forbidden (missing SEND_MESSAGES permission)
//  */
// router.post('/devices', authorize(['SEND_MESSAGES']), generateQr);

// /**
//  * @swagger
//  * /api/whatsapp/send:
//  *   post:
//  *     summary: Send a WhatsApp text message
//  *     tags: [WhatsApp]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - to
//  *               - message
//  *             properties:
//  *               to:
//  *                 type: string
//  *                 description: Phone number or group ID
//  *               message:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Message sent
//  *       403:
//  *         description: Forbidden
//  */
// router.post('/send', authorize(['SEND_MESSAGES']), sendTextMessage);

// /**
//  * @swagger
//  * /api/whatsapp/{session}/contacts:
//  *   get:
//  *     summary: Sync WhatsApp contacts
//  *     tags: [WhatsApp]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: session
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: WhatsApp session ID (e.g., session-userId)
//  *     responses:
//  *       200:
//  *         description: Contacts synced successfully
//  *       403:
//  *         description: Forbidden
//  */
// router.get('/:session/contacts', authorize(['VIEW_LOGS']), syncContacts);

// /**
//  * @swagger
//  * /api/whatsapp/{session}/groups:
//  *   get:
//  *     summary: Sync WhatsApp groups
//  *     tags: [WhatsApp]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: session
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: WhatsApp session ID (e.g., session-userId)
//  *     responses:
//  *       200:
//  *         description: Groups synced successfully
//  *       403:
//  *         description: Forbidden
//  */
// router.get('/:session/groups', authorize(['VIEW_LOGS']), syncGroups);

// export default router;


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
