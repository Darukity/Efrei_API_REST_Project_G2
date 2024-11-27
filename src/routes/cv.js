const router = require('express').Router();
const cvController = require('../controllers/cv');
//const { verifyToken } = require('../middleware/jwt');

router.get('/', cvController.getAllCV);

module.exports = router;