const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecommendationSchema = new Schema(
    {
        cvId: {
            type: Schema.ObjectId,
            ref: 'CV', // Relation avec le modèle CV.
            required: true,
        },
        userId: {
            type: Schema.ObjectId,
            ref: 'User', // Relation avec le modèle User (utilisateur qui a écrit la recommandation).
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Ajoute createdAt et updatedAt automatiquement.
    }
);

const Recommendation = mongoose.model('Recommendation', RecommendationSchema);

module.exports = Recommendation;