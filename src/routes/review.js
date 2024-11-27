const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review');
const { check, validationResult } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: Recommendations
 *   description: API for managing recommendations
 */

/**
 * @swagger
 * /api/recommendations:
 *   post:
 *     summary: Create a new recommendation
 *     description: Adds a new recommendation to a CV.
 *     tags:
 *       - Recommendations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cvId
 *               - userId
 *               - comment
 *             properties:
 *               cvId:
 *                 type: string
 *                 description: The ID of the CV to which the recommendation is related.
 *                 example: "6450d8e8b6f99e9f1a8b4567"
 *               userId:
 *                 type: string
 *                 description: The ID of the user writing the recommendation.
 *                 example: "670507e5a85e8b4542098ab9"
 *               comment:
 *                 type: string
 *                 description: The recommendation text.
 *                 example: "Great team player and an excellent problem solver."
 *     responses:
 *       201:
 *         description: Recommendation created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Recommandation créée avec succès."
 *                 recommendation:
 *                   type: object
 *       400:
 *         description: Bad request - Validation error.
 *       500:
 *         description: Internal server error.
 */
router.post(
    '/',
    [
        check('cvId', 'cvId is required and must be a valid ObjectId').isMongoId(),
        check('userId', 'userId is required and must be a valid ObjectId').isMongoId(),
        check('comment', 'Comment is required').notEmpty(),
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
 *     summary: Get all recommendations
 *     description: Retrieves all recommendations with optional user and CV data populated.
 *     tags:
 *       - Recommendations
 *     responses:
 *       200:
 *         description: A list of recommendations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error.
 */
router.get('/', reviewController.getRecommendations);

/**
 * @swagger
 * /api/recommendations/{id}:
 *   get:
 *     summary: Get a recommendation by ID
 *     description: Retrieves a single recommendation by its ID.
 *     tags:
 *       - Recommendations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the recommendation.
 *         schema:
 *           type: string
 *           example: "6450d8e8b6f99e9f1a8b4567"
 *     responses:
 *       200:
 *         description: Recommendation details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Recommendation not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
    '/:id',
    [check('id', 'Invalid ID format').isMongoId()],
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
 *     summary: Update a recommendation
 *     description: Updates the comment of a recommendation by its ID.
 *     tags:
 *       - Recommendations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the recommendation.
 *         schema:
 *           type: string
 *           example: "6450d8e8b6f99e9f1a8b4567"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The updated recommendation comment.
 *                 example: "Updated recommendation text."
 *     responses:
 *       200:
 *         description: Recommendation updated successfully.
 *       404:
 *         description: Recommendation not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
    '/:id',
    [
        check('id', 'Invalid ID format').isMongoId(),
        check('comment', 'Comment is required').notEmpty(),
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
 *     summary: Delete a recommendation
 *     description: Deletes a recommendation by its ID.
 *     tags:
 *       - Recommendations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the recommendation.
 *         schema:
 *           type: string
 *           example: "6450d8e8b6f99e9f1a8b4567"
 *     responses:
 *       200:
 *         description: Recommendation deleted successfully.
 *       404:
 *         description: Recommendation not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
    '/:id',
    [check('id', 'Invalid ID format').isMongoId()],
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
