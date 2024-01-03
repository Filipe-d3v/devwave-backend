const router = require('express').Router()

const feedBackController = require('../controllers/FeedbackController')

const verifyToken = require('../helpers/get-token')

router.post('/create/:id', verifyToken, feedBackController.create)
router.get('/', feedBackController.getAll)



module.exports = router