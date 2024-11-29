const router = require('express').Router();
const reviewController = require('../controllers/review');
const { verifyToken } = require('../middleware/jwt');

/**
 * @swagger
 * tags:
 *   name: Review
 *   description: API for managing reviews
 */

/**
 * @swagger
 * /api/review/:
 *   post:
 *     summary: Create a new review
 *     description: Add a new review for a CV.
 *     tags:
 *       - Review
 *     requestBody:
 *       description: Review data to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cvId:
 *                 type: string
 *                 description: The ID of the CV being reviewed.
 *               userId:
 *                 type: string
 *                 description: The ID of the user creating the review.
 *               comment:
 *                 type: string
 *                 description: The comment for the review.
 *     responses:
 *       201:
 *         description: Review created successfully.
 *       400:
 *         description: Invalid review data.
 *       500:
 *         description: Internal server error.
 */
router.post('/', verifyToken, reviewController.createRecommendation);

router.get('/', (req, res) => {
    res.send('Hello word');
});

/**
 * @swagger
 * /api/review/cv/{cvId}:
 *   get:
 *     summary: Get all reviews for a CV
 *     description: Retrieve all reviews associated with a specific CV.
 *     tags:
 *       - Review
 *     parameters:
 *       - name: cvId
 *         in: path
 *         required: true
 *         description: The unique identifier of the CV.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of reviews for the specified CV.
 *       404:
 *         description: CV not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/cv/:cvId', reviewController.getRecommendationsForCV);

/**
 * @swagger
 * /api/review/user/{userId}:
 *   get:
 *     summary: Get all reviews by a user
 *     description: Retrieve all reviews created by a specific user.
 *     tags:
 *       - Review
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The unique identifier of the user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of reviews created by the user.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/user/:userId', reviewController.getRecommendationsByUser);

/**
 * @swagger
 * /api/review/{id}:
 *   get:
 *     summary: Get a specific review
 *     description: Retrieve detailed information about a specific review by its ID.
 *     tags:
 *       - Review
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique identifier of the review.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the specified review.
 *       404:
 *         description: Review not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', reviewController.getRecommendationById);

/**
 * @swagger
 * /api/review/{id}:
 *   put:
 *     summary: Update a specific review
 *     description: Modify the content of a specific review by its ID.
 *     tags:
 *       - Review
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique identifier of the review.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated review data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The updated comment for the review.
 *     responses:
 *       200:
 *         description: Review updated successfully.
 *       404:
 *         description: Review not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/:id', verifyToken, reviewController.updateRecommendation);

/**
 * @swagger
 * /api/review/{id}:
 *   delete:
 *     summary: Delete a specific review
 *     description: Remove a review by its unique identifier.
 *     tags:
 *       - Review
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique identifier of the review to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted successfully.
 *       404:
 *         description: Review not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id', verifyToken, reviewController.deleteRecommendation);

module.exports = router;
