const projectController = require('../controllers/ProjectController')

const router = require('express').Router()

const verifyToken = require('../helpers/verify-token')
const uploadImage = require('../helpers/image-upload')
const fileUpload = require('../helpers/file-upload')

router.post('/create', verifyToken, uploadImage.single('image'), projectController.create)
router.patch('/adddocs/:id', verifyToken, fileUpload.single('docs'), projectController.addDoc)
router.patch('/addfeedback/:id', projectController.addFeedback)
router.get('/getall', projectController.getAll)
router.get('/alluserprojects', verifyToken, projectController.getAllUserProjects)
router.get('/getbyid/:id', verifyToken, projectController.getProjectById)



module.exports = router