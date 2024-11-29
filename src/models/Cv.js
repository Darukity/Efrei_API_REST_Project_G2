const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CVSchema = new Schema(
    {
        userId: {
            type: Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        personalInfo: {
            firstName: {
                type: String,
                required: true,
                trim: true,
            },
            lastName: {
                type: String,
                required: true,
                trim: true,
            },
            description: {
                type: String,
                required: false,
            },
        },
        education: [
            {
                degree: { type: String, required: true },
                institution: { type: String, required: true },
                year: { type: Number, required: true },
            },
        ],
        experience: [
            {
                jobTitle: { type: String, required: true },
                company: { type: String, required: true },
                years: { type: Number, required: true },
            },
        ],
        isVisible: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const CV = mongoose.model('CV', CVSchema);

module.exports = CV;