const express = require('express');
const router = express.Router();
const reviewController = require('/controllers/review'); // Référence au contrôleur `review.js`

// Routes CRUD pour les recommandations
router.post('/', reviewController.createRecommendation); // Créer 
router.get('/', reviewController.getRecommendations); // Obtenir tout
router.get('/:id', reviewController.getRecommendationById); // Obtenir par ID
router.put('/:id', reviewController.updateRecommendation); // Mettre à jour 
router.delete('/:id', reviewController.deleteRecommendation); // Supprimer 

module.exports = router;