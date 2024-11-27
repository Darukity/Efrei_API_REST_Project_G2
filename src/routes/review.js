const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review');
const { verifyToken } = require('../middleware/jwt');
const { check, validationResult } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: Recommendations
 *   description: API pour la gestion des recommandations
 */

/**
 * @swagger
 * /api/recommendations:
 *   post:
 *     summary: Créer une nouvelle recommandation
 *     description: Permet à un utilisateur d'ajouter une recommandation à un CV.
 *     tags:
 *       - Recommendations
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cvId
 *               - comment
 *             properties:
 *               cvId:
 *                 type: string
 *                 description: L'identifiant du CV.
 *                 example: "6450d8e8b6f99e9f1a8b4567"
 *               comment:
 *                 type: string
 *                 description: Le commentaire.
 *                 example: "Excellent travail sur ce projet !"
 *     responses:
 *       201:
 *         description: Recommandation créée avec succès.
 *       404:
 *         description: CV ou utilisateur introuvable.
 *       500:
 *         description: Erreur serveur.
 */
router.post(
    '/',
    verifyToken,
    [
        check('cvId', 'cvId est requis et doit être un ObjectId valide').isMongoId(),
        check('comment', 'Le commentaire est requis').notEmpty(),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    reviewController.createRecommendation
);

/**
 * @swagger
 * /api/recommendations:
 *   get:
 *     summary: Récupérer toutes les recommandations
 *     description: Retourne toutes les recommandations avec les détails des utilisateurs et des CV.
 *     tags:
 *       - Recommendations
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des recommandations.
 *       500:
 *         description: Erreur serveur.
 */
router.get('/', verifyToken, reviewController.getRecommendations);

/**
 * @swagger
 * /api/recommendations/{id}:
 *   get:
 *     summary: Récupérer une recommandation par ID
 *     description: Retourne les détails d'une recommandation spécifique.
 *     tags:
 *       - Recommendations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'identifiant de la recommandation.
 *         schema:
 *           type: string
 *           example: "6450d8e8b6f99e9f1a8b4567"
 *     responses:
 *       200:
 *         description: Détails de la recommandation.
 *       404:
 *         description: Recommandation introuvable.
 *       500:
 *         description: Erreur serveur.
 */
router.get(
    '/:id',
    verifyToken,
    [check('id', 'ID invalide').isMongoId()],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    reviewController.getRecommendationById
);

/**
 * @swagger
 * /api/recommendations/{id}:
 *   put:
 *     summary: Modifier une recommandation
 *     description: Permet de modifier le commentaire d'une recommandation existante.
 *     tags:
 *       - Recommendations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'identifiant de la recommandation.
 *         schema:
 *           type: string
 *           example: "6450d8e8b6f99e9f1a8b4567"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comment
 *             properties:
 *               comment:
 *                 type: string
 *                 description: Nouveau commentaire.
 *                 example: "Texte mis à jour."
 *     responses:
 *       200:
 *         description: Recommandation mise à jour.
 *       404:
 *         description: Recommandation introuvable.
 *       403:
 *         description: Non autorisé à modifier cette recommandation.
 *       500:
 *         description: Erreur serveur.
 */
router.put(
    '/:id',
    verifyToken,
    [
        check('id', 'ID invalide').isMongoId(),
        check('comment', 'Le commentaire est requis').notEmpty(),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    reviewController.updateRecommendation
);

/**
 * @swagger
 * /api/recommendations/{id}:
 *   delete:
 *     summary: Supprimer une recommandation
 *     description: Permet de supprimer une recommandation. Seul le propriétaire du CV peut la supprimer.
 *     tags:
 *       - Recommendations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'identifiant de la recommandation.
 *         schema:
 *           type: string
 *           example: "6450d8e8b6f99e9f1a8b4567"
 *     responses:
 *       200:
 *         description: Recommandation supprimée.
 *       404:
 *         description: Recommandation introuvable.
 *       403:
 *         description: Non autorisé à supprimer cette recommandation.
 *       500:
 *         description: Erreur serveur.
 */
router.delete(
    '/:id',
    verifyToken,
    [check('id', 'ID invalide').isMongoId()],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    reviewController.deleteRecommendation
);

module.exports = router;
