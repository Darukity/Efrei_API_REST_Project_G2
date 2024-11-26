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
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            await User.findByIdAndDelete(id);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error: error.message });
        }
    },
    
    updateUser: async (req, res) => {
        const { id } = req.params;
        const { name, email, password } = req.body;
    
        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            if (name) user.name = name;
            if (email) user.email = email;
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                user.password = hashedPassword;
            }
    
            await user.save();
            res.status(200).json({ message: 'User updated successfully', user });
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error: error.message });
        }
    };
    

};
