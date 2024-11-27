const router = require('express').Router();
const userController = require('../controllers/user');
const { verifyToken } = require('../middleware/jwt');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API for managing user information
 */

/**
 * @swagger
 * /api/user/me:
 *   post:
 *     summary: Get the current user's information
 *     description: Retrieve the authenticated user's information using the JWT token.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []  # Requires a bearer token
 *     responses:
 *       200:
 *         description: User information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the user.
 *                   example: "670507e5a85e8b4542098ab9"
 *                 name:
 *                   type: string
 *                   description: The user's name.
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   description: The user's email address.
 *                   example: john.doe@example.com
 *       500:
 *         description: Internal server error.
 */
router.post('/me', verifyToken, userController.getMyInfos);

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Deletes a user using their ID. Requires authentication.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []  # Requires a bearer token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user to delete.
 *         schema:
 *           type: string
 *           example: "670507e5a85e8b4542098ab9"
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully."
 *       404:
 *         description: User not found.
 *       500:
 *         description: Error deleting the user.
 */
router.delete('/:id', verifyToken, userController.deleteUser);

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Updates a user's information. Accepts name, email, and optionally a new password.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []  # Requires a bearer token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user to update.
 *         schema:
 *           type: string
 *           example: "670507e5a85e8b4542098ab9"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the user.
 *                 example: "Jane Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The new email address of the user.
 *                 example: jane.doe@example.com
 *               password:
 *                 type: string
 *                 description: The new password for the user. It will be hashed before saving.
 *                 example: "NewP@ssword123"
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User updated successfully."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The unique identifier of the updated user.
 *                       example: "670507e5a85e8b4542098ab9"
 *                     name:
 *                       type: string
 *                       description: The updated name of the user.
 *                       example: Jane Doe
 *                     email:
 *                       type: string
 *                       description: The updated email address of the user.
 *                       example: jane.doe@example.com
 *       404:
 *         description: User not found.
 *       500:
 *         description: Error updating the user.
 */
router.put('/:id', verifyToken, userController.updateUser);

module.exports = router;
