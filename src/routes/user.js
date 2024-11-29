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
 * /user/{id}:
 *   delete:
 *     summary: Supprime un utilisateur spécifique
 *     description: Permet à un utilisateur authentifié de supprimer son propre compte. L'utilisateur doit être autorisé à effectuer cette opération.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *         schema:
 *           type: string
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Token JWT sous la forme `Bearer <token>`
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       403:
 *         description: Non autorisé à supprimer cet utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized to delete this User
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Une erreur est survenue lors de la suppression de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while deleting the User
 */
router.delete('/:id', verifyToken, userController.deleteUser);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Met à jour un utilisateur spécifique
 *     description: Permet à un utilisateur authentifié de mettre à jour son propre compte. L'utilisateur doit être autorisé à effectuer cette opération.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à mettre à jour
 *         schema:
 *           type: string
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Token JWT sous la forme `Bearer <token>`
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: SecurePassword123
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 12345
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *       400:
 *         description: Données utilisateur invalides
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid User data
 *       403:
 *         description: Non autorisé à mettre à jour cet utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized to update this User
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Une erreur est survenue lors de la mise à jour de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while updating the User
 */
router.put('/:id', verifyToken, userController.updateUser);

module.exports = router;
