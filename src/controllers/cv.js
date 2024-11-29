const { verifyCv } = require('../validator/cv')
const Cvmodel = require('../models/Cv');

module.exports = {
    createCV: async (req, res) => {
        try {
            // Validation
            const isNotValid = verifyCv(req.body);
            if (isNotValid) {
                return res.status(400).send({
                    error: isNotValid.message
                });
            }

            // Création du CV
            const newCv = new Cvmodel({
                userId: req.body.userId,
                personalInfo: req.body.personalInfo,
                education: req.body.education,
                experience: req.body.experience,
                isVisible: req.body.isVisible,
            });

            newCv.save();

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
            const cvs = await Cvmodel.find();
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
            const visible_cvs = await Cvmodel.find(
                {isVisible: {$eq: true}}
            );
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
            const cv = await Cvmodel.findById(cvId);

            if (!cv) {
                return res.status(404).send({
                    error: 'CV not found',
                });
            }

            // Vérifier si le cv n'est pas visible
            if (cv.isVisible === false) {
                // Vérifier que l'utilisateur est le propriétaire du CV
                if (cv.userId.toString() !== req.user._id.toString()) {
                    return res.status(403).send({
                        error: 'Unauthorized to see this CV',
                    });
                }
            }

            res.status(200).send(cv);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                error: error.message || 'An error occurred while getting the CV',
            });
        }
    },

    getUserCV: async (req, res) => {
        try {
            const userId = req.params.id;

            // Rechercher les CVs appartenant à cet utilisateur
            const cvs = await Cvmodel.find({ userId: userId });

            if (!cvs || cvs.length === 0) {
                return res.status(404).send({
                    error: 'No CVs found for this user.',
                });
            }

            // Vérifier que l'utilisateur est bien le propriétaire
            if (userId !== req.user._id.toString()) {
                return res.status(403).send({
                    error: 'Unauthorized to access these CVs.',
                });
            }

            res.status(200).send(cvs);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                error: error.message || 'An error occurred while fetching the CVs.',
            });
        }
    },

    updateCV: async (req, res) => {
        try {
            const cvId = req.params.id;

            // Validation
            const isNotValid = verifyCv(req.body);
            if (!isNotValid) {
                return res.status(400).send({
                    error: 'Invalid CV data',
                });
            }

            // Rechercher le CV dans la base de données
            const cv = await Cvmodel.findById(cvId);

            if (!cv) {
                return res.status(404).send({
                    error: 'CV not found',
                });
            }

            // Vérifier que l'utilisateur est le propriétaire du CV
            if (cv.userId.toString() !== req.user._id.toString()) {
                return res.status(403).send({
                    error: 'Unauthorized to update this CV',
                });
            }

            const updatedCV = await Cvmodel.findByIdAndUpdate(cvId, req.body, {
                new: true,
            });

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

            // Rechercher le CV dans la base de données
            const cv = await Cvmodel.findById(cvId);

            if (!cv) {
                return res.status(404).send({
                    error: 'CV not found',
                });
            }

            // Vérifier que l'utilisateur est le propriétaire du CV
            if (cv.userId.toString() !== req.user._id.toString()) {
                return res.status(403).send({
                    error: 'Unauthorized to delete this CV',
                });
            }

            // Suppression
            const deletedCV = await Cvmodel.findByIdAndDelete(cvId);

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

            // Rechercher le CV dans la base de données
            const cv = await Cvmodel.findById(cvId);

            if (!cv) {
                return res.status(404).send({
                    error: 'CV not found',
                });
            }

            // Vérifier que l'utilisateur est le propriétaire du CV
            if (cv.userId.toString() !== req.user._id.toString()) {
                return res.status(403).send({
                    error: 'Unauthorized to edit visibility for this CV',
                });
            }

            // Vérification si la visibilité est correctement définie
            const { isVisible } = req.body;
            if (typeof isVisible !== 'boolean') {
                return res.status(400).send({
                    error: 'Invalid visibility data. "isVisible" must be a boolean value.',
                });
            }

            // Mise à jour de la visibilité
            const updatedCV = await Cvmodel.findByIdAndUpdate(
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