const { validateReview } = require('../validators/reviewValidator');
const Recommendation = require('../models/Review');
const CV = require('../models/CV');


const createRecommendation = async (req, res) => {
    try {
        const validationErrors = validateReview(req.body);
        if (validationErrors) {
            return res.status(400).json({ error: validationErrors.message });
        }

        const { cvId, comment } = req.body;
        const userId = req.user._id; 

        const cvExists = await CV.findById(cvId);
        if (!cvExists) {
            return res.status(404).json({ error: 'CV not found.' });
        }

        const recommendation = new Recommendation({ cvId, userId, comment });
        await recommendation.save();

        res.status(201).json({ message: 'Recommendation created successfully.', recommendation });
    } catch (error) {
        res.status(500).json({ error: 'Error creating recommendation.', details: error.message });
    }
};

const updateRecommendation = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        const userId = req.user._id; 

        const recommendation = await Recommendation.findById(id);
        if (!recommendation) {
            return res.status(404).json({ error: 'Recommendation not found.' });
        }
        if (!recommendation.userId.equals(userId)) {
            return res.status(403).json({ error: 'You are not authorized to update this recommendation.' });
        }

        const validationErrors = validateReview({ cvId: recommendation.cvId, comment });
        if (validationErrors) {
            return res.status(400).json({ error: validationErrors.message });
        }

        recommendation.comment = comment;
        await recommendation.save();

        res.status(200).json({ message: 'Recommendation updated successfully.', recommendation });
    } catch (error) {
        res.status(500).json({ error: 'Error updating recommendation.', details: error.message });
    }
};

const deleteRecommendation = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const recommendation = await Recommendation.findById(id);
        if (!recommendation) {
            return res.status(404).json({ error: 'Recommendation not found.' });
        }

        const cv = await CV.findById(recommendation.cvId);
        if (!cv || !cv.userId.equals(userId)) {
            return res.status(403).json({ error: 'You are not authorized to delete this recommendation.' });
        }

        await recommendation.deleteOne();

        res.status(200).json({ message: 'Recommendation deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting recommendation.', details: error.message });
    }
};

module.exports = {
    createRecommendation,
    updateRecommendation,
    deleteRecommendation,
};
