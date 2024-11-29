const { verifyUser } = require('../validator/user')
const Usermodel = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    getMyInfos: async (req, res) => {
        try {
            const { id, name, email } = req.user;
            res.send({
                id,
                name,
                email
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || 'Some error occurred on getting user informations'
            });
        }
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;
    
        try {
            // Vérifier si l'utilisateur existe
            const user = await Usermodel.findById(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
    
            // Vérifier si l'utilisateur a l'autorisation de supprimer
            if (user._id.toString() !== req.user._id.toString()) {
                return res.status(403).json({ error: 'Unauthorized to delete this User' });
            }
    
            // Supprimer l'utilisateur
            await Usermodel.findByIdAndDelete(id);
    
            // Réponse réussie
            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            // Gérer les erreurs
            console.error(error);
            return res.status(500).json({
                error: error.message || 'An error occurred while deleting the User',
            });
        }
    },
    
    updateUser: async (req, res) => {
        const { id } = req.params;
        const { name, email, password } = req.body; 
    
        try {
            // Valider les données du corps de la requête
            const isNotValidateUser = verifyUser(req.body);

            if (isNotValidateUser) {
                res.status(400).send({
                    error: isNotValidateUser.message
                });
            }
            // Vérifier si l'utilisateur existe
            const user = await Usermodel.findById(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
    
            // Vérifier si l'utilisateur a l'autorisation de mettre à jour
            if (user._id.toString() !== req.user._id.toString()) {
                return res.status(403).json({ error: 'Unauthorized to update this User' });
            }
    
            // Mettre à jour les champs spécifiés
            if (name) user.name = name;
            if (email) user.email = email;
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                user.password = hashedPassword;
            }
    
            // Enregistrer les modifications
            const updatedUser = await user.save();
    
            // Réponse réussie
            return res.status(200).json({
                message: 'User updated successfully',
                user: updatedUser,
            });
        } catch (error) {
            // Gérer les erreurs
            console.error(error);
            return res.status(500).json({
                error: error.message || 'An error occurred while updating the User',
            });
        }
    }
};
