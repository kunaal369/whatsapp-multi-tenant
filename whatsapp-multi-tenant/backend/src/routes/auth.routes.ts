import { Router } from 'express';
import { login, refresh, logout } from '../controllers/auth.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful and returns access token
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh access token using refresh token cookie
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: New access token returned
 *       401:
 *         description: Refresh token missing
 *       403:
 *         description: Invalid refresh token
 */
router.post('/refresh', refresh);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user and clear refresh token cookie
 *     tags: [Auth]
 *     responses:
 *       204:
 *         description: Logout successful
 */
router.post('/logout', logout);

export default router;
