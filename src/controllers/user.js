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
    }
};
