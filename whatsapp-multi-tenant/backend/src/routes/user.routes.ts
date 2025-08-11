import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { authorize } from '../middlewares/permissions';
import { createUser, assignUserToGroup, getUsers } from '../controllers/user.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs (Admin only)
 */

router.use(authenticate);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - groupId
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               groupId:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       403:
 *         description: Forbidden (missing permissions)
 */
router.post('/', authorize(['MANAGE_USERS']), createUser);

/**
 * @swagger
 * /api/users/{userId}/group:
 *   put:
 *     summary: Assign a user to a group
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - groupId
 *             properties:
 *               groupId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User assigned to group
 *       403:
 *         description: Forbidden
 */
router.put('/:userId/group', authorize(['MANAGE_USERS']), assignUserToGroup);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Forbidden
 */
router.get('/', authorize(['MANAGE_USERS']), getUsers);

export default router;
