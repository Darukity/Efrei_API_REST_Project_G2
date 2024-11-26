//const { verifyBook } = require('../validator/cv');
const CV_model = require('../models/cv');
module.exports = {
    createCV: async (req, res) => {
        try {
            const cv = new CV_model({
                userId: req.body.userId,
                personalInfo: req.body.personalInfo,
                education: req.body.education,
                experience: req.body.experience,
                isVisible: req.body.isVisible,
            });
            res.send
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while creating the CV');
        }
    },
    getCV: async (req, res) => {
        try {
            const cvId = req.params.id;
            const cv = CV_model.findById(cvId);
            res.send(cv);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while getting the CV');
        }
    },
    updateCV: (req, res) => {
        try {
            const cvId = req.params.id;
            const cv = CV_model.findByIdAndUpdate(cvId, req.body);
            res.send(cv);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while updating the CV');
        }
    },
    delete: (req, res) => {
        try {
            const cvId = req.params.id;
            const cv = CV_model.findByIdAndDelete(cvId);
            res.send(cv);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while deleting the CV');
        }
    },
};