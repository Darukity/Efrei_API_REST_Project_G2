const express = require('express');
const router = express.Router();
const reviewController = require('/controllers/review'); // Référence au contrôleur `review.js`

// Routes CRUD pour les recommandations
router.post('/', reviewController.createRecommendation); // Créer une recommandation
router.get('/', reviewController.getRecommendations); // Obtenir toutes les recommandations
router.get('/:id', reviewController.getRecommendationById); // Obtenir une recommandation par ID
router.put('/:id', reviewController.updateRecommendation); // Mettre à jour une recommandation
router.delete('/:id', reviewController.deleteRecommendation); // Supprimer une recommandation

module.exports = router;