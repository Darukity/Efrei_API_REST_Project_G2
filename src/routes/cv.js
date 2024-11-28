const router = require('express').Router();
const cvController = require('../controllers/cv');
const {verifyToken} = require("../middleware/jwt");

/**
 * @swagger
 * tags:
 *   name: CV
 *   description: API for managing CVs
 */

/**
 * @swagger
 * /api/cv/:
 *   get:
 *     summary: Get all CVs
 *     description: Retrieve a list of all CVs stored in the database.
 *     tags:
 *       - CV
 *     responses:
 *       200:
 *         description: List of all CVs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CV'
 *       500:
 *         description: Internal server error.
 */
router.get('/', cvController.getAllCV);

/**
 * @swagger
 * /api/cv/getAllVisible:
 *   get:
 *     summary: Get all visible CVs
 *     description: Retrieve a list of all CVs that are marked as visible.
 *     tags:
 *       - CV
 *     responses:
 *       200:
 *         description: List of visible CVs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CV'
 *       500:
 *         description: Internal server error.
 */
router.get('/getAllVisible', cvController.getAllVisibleCV);

/**
 * @swagger
 * /api/cv/{id}:
 *   get:
 *     summary: Get a specific CV
 *     description: Retrieve detailed information about a specific CV by its ID.
 *     tags:
 *       - CV
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique identifier of the CV.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the specified CV.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CV'
 *       404:
 *         description: CV not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', verifyToken,cvController.getCV);

/**
 * @swagger
 * /api/cv/{id}:
 *   put:
 *     summary: Update a specific CV
 *     description: Modify the details of a specific CV by its ID.
 *     tags:
 *       - CV
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique identifier of the CV to update.
 *         schema:
 *           type: string
 *           example: "63c7f9b1c02c65b2d1234567"
 *     requestBody:
 *       description: Updated CV data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CV'
 *     responses:
 *       200:
 *         description: CV updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CV'
 *       404:
 *         description: CV not found.
 *       400:
 *         description: Invalid request data.
 *       500:
 *         description: Internal server error.
 */
router.put('/:id', verifyToken, cvController.updateCV);

/**
 * @swagger
 * /api/cv/{id}:
 *   delete:
 *     summary: Delete a specific CV
 *     description: Remove a CV by its unique identifier.
 *     tags:
 *       - CV
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique identifier of the CV to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: CV deleted successfully.
 *       404:
 *         description: CV not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id', verifyToken, cvController.deleteCV);

/**
 * @swagger
 * /api/cv/:
 *   post:
 *     summary: Create a new CV
 *     description: Add a new CV to the database.
 *     tags:
 *       - CV
 *     requestBody:
 *       description: CV data to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CV'
 *     responses:
 *       201:
 *         description: CV created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CV'
 *       400:
 *         description: Invalid CV data.
 *       500:
 *         description: Internal server error.
 */
router.post('/', verifyToken, cvController.createCV);

/**
 * @swagger
 * /api/cv/{id}/visibility:
 *   patch:
 *     summary: Update the visibility of a CV
 *     description: Update the visibility status (`isVisible`) of a specific CV by its ID.
 *     tags:
 *       - CV
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique identifier of the CV to update visibility for.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The new visibility status
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isVisible:
 *                 type: boolean
 *                 description: The new visibility status.
 *                 example: true
 *     responses:
 *       200:
 *         description: CV visibility updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: CV visibility updated successfully.
 *                 data:
 *                   $ref: '#/components/schemas/CV'
 *       400:
 *         description: Invalid visibility data.
 *       404:
 *         description: CV not found.
 *       500:
 *         description: Internal server error.
 */
router.patch('/:id/visibility', verifyToken, cvController.setVisibility);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     CV:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: The unique identifier of the user.
 *           example: "63c7f9b1c02c65b2d1234567"
 *         personalInfo:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *               description: The first name of the user.
 *               example: "John"
 *             lastName:
 *               type: string
 *               description: The last name of the user.
 *               example: "Doe"
 *             description:
 *               type: string
 *               description: A short bio or description of the user.
 *               example: "Experienced full-stack developer."
 *         education:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               degree:
 *                 type: string
 *                 description: Degree obtained.
 *                 example: "Bachelor of Science in Computer Science"
 *               institution:
 *                 type: string
 *                 description: Institution where the degree was obtained.
 *                 example: "MIT"
 *               year:
 *                 type: integer
 *                 description: Year of completion.
 *                 example: 2020
 *         experience:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               jobTitle:
 *                 type: string
 *                 description: Job title held.
 *                 example: "Software Engineer"
 *               company:
 *                 type: string
 *                 description: Company name.
 *                 example: "TechCorp"
 *               years:
 *                 type: integer
 *                 description: Years of experience in the role.
 *                 example: 3
 *         isVisible:
 *           type: boolean
 *           description: Visibility status of the CV.
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the CV was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the CV was last updated.
 */

