const { verifyCV } = require('../validator/cv');
const CVmodel = require('../models/cv');

module.exports = {
    createCV: async (req, res) => {
        try {
            // Validation
            const isNotValid = verifyCV(req.body);
            if (!isNotValid) {
                return res.status(400).send({
                    error: 'Invalid CV data',
                });
            }

            // Création du CV
            const newCv = await CVmodel.create({
                userId: req.body.userId,
                personalInfo: req.body.personalInfo,
                education: req.body.education,
                experience: req.body.experience,
                isVisible: req.body.isVisible,
            });

            res.status(201).send({
                success: true,
                cv: newCv,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                error: error.message || 'An error occurred while creating the CV',
            });
        }
    },

    getAllCV: async (req, res) => {
        try {
            const cvs = await CVmodel.find();
            res.status(200).send(cvs);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                error: error.message || 'Something went wrong while fetching CVs',
            });
        }
    },

    getAllVisibleCV: async (req, res) => {
        try {
            const visible_cvs = await CVmodel.find();
            res.status(200).send(visible_cvs);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                error: error.message || 'An error occurred while fetching Visible CV',
            })
        }
    },

    getCV: async (req, res) => {
        try {
            const cvId = req.params.id;

            // Recherche du CV
            const cv = await CVmodel.findById(cvId);
            if (!cv) {
                return res.status(404).send({
                    error: 'CV not found',
                });
            }

            res.status(200).send(cv);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                error: error.message || 'An error occurred while getting the CV',
            });
        }
    },

    updateCV: async (req, res) => {
        try {
            const cvId = req.params.id;

            // Validation
            const isNotValid = verifyCV(req.body);
            if (!isNotValid) {
                return res.status(400).send({
                    error: 'Invalid CV data',
                });
            }

            // Mise à jour
            const updatedCV = await CVmodel.findByIdAndUpdate(cvId, req.body, {
                new: true,
            });

            if (!updatedCV) {
                return res.status(404).send({
                    error: 'CV not found',
                });
            }

            res.status(200).send({
                message: 'CV updated successfully',
                data: updatedCV,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                error: error.message || 'An error occurred while updating the CV',
            });
        }
    },

    deleteCV: async (req, res) => {
        try {
            const cvId = req.params.id;

            // Suppression
            const deletedCV = await CVmodel.findByIdAndDelete(cvId);

            if (!deletedCV) {
                return res.status(404).send({
                    error: 'CV not found',
                });
            }

            res.status(200).send({
                message: 'CV deleted successfully',
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                error: error.message || 'Something went wrong while deleting the CV',
            });
        }
    },

    setVisibility: async (req, res) => {
        try {
            const cvId = req.params.id;

            // Vérification si la visibilité est correctement définie
            const { isVisible } = req.body;
            if (typeof isVisible !== 'boolean') {
                return res.status(400).send({
                    error: 'Invalid visibility data. "isVisible" must be a boolean value.',
                });
            }

            // Mise à jour de la visibilité
            const updatedCV = await CVmodel.findByIdAndUpdate(
                cvId,
                { isVisible },
                { new: true } // Retourne le document mis à jour
            );

            if (!updatedCV) {
                return res.status(404).send({
                    error: 'CV not found',
                });
            }

            res.status(200).send({
                message: 'CV visibility updated successfully',
                data: updatedCV,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                error: error.message || 'An error occurred while updating the CV visibility',
            });
        }
    },
};