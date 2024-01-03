const Feedback = require('../models/Feedback')

const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class FeedbackController {
  static async create(req, res) {
    const { rating, comment} = req.body

    const id = req.params.id
    
    if(!id) {
      res.status(404).json({message: 'Projeto não encontrado!'})
      return
    }

    const project = id

    if (!rating) {
      res.status(422).json({ message: 'Avalie com as estrelimhas!' })
      return
    }
    if (!comment) {
      res.status(422).json({ message: 'Digite um comentário sobre o projeto!' })
      return
    }
    if (!project) {
      res.status(422).json({ message: 'projeto não encontrado' })
      return
    }

    const token = getToken(req)
    const user = await getUserByToken(token)

    const localDate = new Date().toLocaleString()

    const feedback = new Feedback({
      date: localDate,
      rating: rating,
      comment: comment,
      project: project,
      owner: {
        _id: user._id,
        name: user.name,
        email: user.email,
      }
    })

    try {
      await feedback.save()
      res.status(200).json({ message: 'Obrigado pelo feedback!' })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  static async getAll(req, res) {
    const feedback = await Feedback.find().sort('-createdAt').populate('project')
    res.status(200).json({ feedback: feedback })
  }
}