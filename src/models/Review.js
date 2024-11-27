const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecommendationSchema = new Schema(
    {
        cvId: {
            type: Schema.ObjectId,
            ref: 'CV', 
            required: true,
        },
        userId: {
            type: Schema.ObjectId,
            ref: 'User', 
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, 
    }
);

const Recommendation = mongoose.model('Recommendation', RecommendationSchema);

module.exports = Recommendation;
