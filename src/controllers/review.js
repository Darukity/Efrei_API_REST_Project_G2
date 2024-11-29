const Recommendation = require('../models/Review');
const CV = require('../models/CV');
const User = require('../models/User');

// Créer une nouvelle recommandation
exports.createRecommendation = async (req, res) => {
    try {
        const { cvId, userId, comment } = req.body;

        const cvExists = await CV.findById(cvId);
        if (!cvExists) {
            return res.status(404).json({ error: 'CV not found.' });
        }

        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const recommendation = new Recommendation({
            cvId,
            userId,
            comment,
        });

        await recommendation.save();

        res.status(201).json({ message: 'Recommendation created successfully.', recommendation });
    } catch (error) {
        res.status(500).json({ error: 'Error creating recommendation.', details: error.message });
    }
};

// Récupérer toutes les recommandations liées à un CV spécifique
exports.getRecommendationsForCV = async (req, res) => {
    try {
        const { cvId } = req.params;

        const cvExists = await CV.findById(cvId);
        if (!cvExists) {
            return res.status(404).json({ error: 'CV not found.' });
        }

        const recommendations = await Recommendation.find({ cvId }).populate('userId', 'name email');

        res.status(200).json({ recommendations });
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving recommendations for CV.', details: error.message });
    }
};

// Récupérer toutes les recommandations créées par un utilisateur spécifique
exports.getRecommendationsByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const recommendations = await Recommendation.find({ userId })
            .populate('cvId', 'title')
            .populate('userId', 'name email');

        res.status(200).json({ recommendations });
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving recommendations for user.', details: error.message });
    }
};

// Récupérer une recommandation par son ID
exports.getRecommendationById = async (req, res) => {
    try {
        const { id } = req.params;
        const recommendation = await Recommendation.findById(id)
            .populate('cvId', 'title')
            .populate('userId', 'name email');

        if (!recommendation) {
            return res.status(404).json({ error: 'Recommendation not found.' });
        }

        res.status(200).json(recommendation);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving recommendation.', details: error.message });
    }
};

// Mettre à jour une recommandation
exports.updateRecommendation = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;

        const recommendation = await Recommendation.findByIdAndUpdate(
            id,
            { comment },
            { new: true, runValidators: true }
        );

        if (!recommendation) {
            return res.status(404).json({ error: 'Recommendation not found.' });
        }

        res.status(200).json({ message: 'Recommendation updated successfully.', recommendation });
    } catch (error) {
        res.status(500).json({ error: 'Error updating recommendation.', details: error.message });
    }
};

// Supprimer une recommandation
exports.deleteRecommendation = async (req, res) => {
    try {
        const { id } = req.params;

        const recommendation = await Recommendation.findByIdAndDelete(id);

        if (!recommendation) {
            return res.status(404).json({ error: 'Recommendation not found.' });
        }

        res.status(200).json({ message: 'Recommendation deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting recommendation.', details: error.message });
    }
};
