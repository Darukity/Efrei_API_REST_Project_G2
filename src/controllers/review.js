const Recommendation = require('../models/Review'); // Assurez-vous que le chemin est correct
const CV = require('../models/CV'); // Modèle CV (si nécessaire pour validation)
const User = require('../models/User'); // Modèle User (si nécessaire pour validation)

// Créer une nouvelle recommandation
exports.createRecommendation = async (req, res) => {
    try {
        const { cvId, userId, comment } = req.body;

        // Vérifier si le CV et l'utilisateur existent (facultatif, selon vos besoins)
        const cvExists = await CV.findById(cvId);
        if (!cvExists) {
            return res.status(404).json({ error: "CV introuvable." });
        }

        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ error: "Utilisateur introuvable." });
        }

        // Créer une nouvelle recommandation
        const recommendation = new Recommendation({
            cvId,
            userId,
            comment,
        });

        await recommendation.save();

        res.status(201).json({ message: "Recommandation créée avec succès.", recommendation });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la création de la recommandation.", details: error.message });
    }
};

// Obtenir toutes les recommandations
exports.getRecommendations = async (req, res) => {
    try {
        const recommendations = await Recommendation.find()
            .populate('cvId', 'title') // Remplacez 'title' par les champs nécessaires de CV
            .populate('userId', 'name email'); // Remplacez 'name email' par les champs nécessaires de User

        res.status(200).json(recommendations);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des recommandations.", details: error.message });
    }
};

// Obtenir une recommandation par ID
exports.getRecommendationById = async (req, res) => {
    try {
        const { id } = req.params;
        const recommendation = await Recommendation.findById(id)
            .populate('cvId', 'title') // Remplacez 'title' par les champs nécessaires de CV
            .populate('userId', 'name email'); // Remplacez 'name email' par les champs nécessaires de User

        if (!recommendation) {
            return res.status(404).json({ error: "Recommandation introuvable." });
        }

        res.status(200).json(recommendation);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération de la recommandation.", details: error.message });
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
            return res.status(404).json({ error: "Recommandation introuvable." });
        }

        res.status(200).json({ message: "Recommandation mise à jour avec succès.", recommendation });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour de la recommandation.", details: error.message });
    }
};

// Supprimer une recommandation
exports.deleteRecommendation = async (req, res) => {
    try {
        const { id } = req.params;

        const recommendation = await Recommendation.findByIdAndDelete(id);

        if (!recommendation) {
            return res.status(404).json({ error: "Recommandation introuvable." });
        }

        res.status(200).json({ message: "Recommandation supprimée avec succès." });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression de la recommandation.", details: error.message });
    }
};
