const router = require('express').Router();

const LevelController = require('../controllers/LevelController');
const verifyToken = require('../helpers/verify-token');

router.post('/create', verifyToken, LevelController.create);
router.get('/getuserskills', verifyToken, LevelController.getUserSkills);

module.exports = router;