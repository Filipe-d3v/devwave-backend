const Project = require('../models/Project')
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class ProjectController {
  static async create(req, res) {
    const { name, link, skills, desc } = req.body

    if (!req.file) {
      res.status(422).json({ message: 'Escola uma foto para o projeto!' })
      return
    }

    if (!desc) {
      res.status(422).json({message: 'Por favor insira uma descrição para o projeto'})
      return
    }

    const image = req.file.filename

    if (!name) {
      res.status(422).json({ message: 'Dê ao projeto um nome!' })
      return
    }

    var currentUser
    const token = getToken(req)
    const decoded = jwt.verify(token, 'secret')

    currentUser = await User.findById(decoded.id)

    const project = new Project({
      name: name,
      link: link,
      image: image,
      desc: desc,
      skills: skills,
      user: {
        _id: currentUser._id,
        name: currentUser.name,
        surname: currentUser.surname,
        email: currentUser.email,
        image: currentUser.image,
        gender: currentUser.gender,
        phone: currentUser.phone
      },
    })
    try {

      const newProject = await project.save()
      const projectUser = await Project.findById(project._id).populate('user', ['name', 'surname', 'email', 'image'])
      res.status(200).json({ message: 'Projeto postado!', newProject, project: projectUser })
    } catch (error) {
      res.status(500).json({ message: error })
      console.log(error)
    }
  }

  static async addDoc(req, res) {
    const id = req.params.id

    if (!req.file) {
      res.status(200).json({ message: 'Nenhum arquivo escolhido!' })
    }
    const docs = req.file.filename
    const updatedData = {}

    const project = await Project.findOne({ _id: id })

    if (!project) {
      res.status(404).json({ message: 'Projeto não encontrado!' })
      return
    }

    // const token = getToken(req)
    // const user = await getUserByToken(token)

    // if (project.user.id.toString() !== user._id.toString()) {
    //     res.status(402).json({ message: 'Ocorreu um problema! Tente novamente.' })
    //     return
    // }

    updatedData.docs = docs

    await Project.findByIdAndUpdate(id, updatedData)
    res.status(200).json({ message: 'Documentação adicionada!' })
  }

  static async addFeedback(req, res) {
    const id = req.params.id
    const { rating, comment } = req.body
    const updatedData = {}

    const project = await Project.findOne({ _id: id })

    if (!project) {
      res.status(201).json({ message: 'Projeto não encontrado! ' })
    }

    if (!rating) {
      res.status(422).json({ message: 'Dê as estrelinhas de acordo com a sua avaliação!' })
      return
    }
    updatedData.rating = rating

    if (!comment) {
      res.status(422).json({ message: 'Escreva um comentário por favor!' })
      return
    }
    updatedData.comment = comment

    await Project.findByIdAndUpdate(id, updatedData)
    res.status(201).json({ message: 'Obrigado pelo feedback!' })

  }

  static async getAll(req, res) {

    const projects = await Project.find().sort('-createdAt')
    res.status(200).json({ projects: projects, })
  }

  static async getAllUserProjects(req, res) {

    var user
    const token = getToken(req)
    const decoded = jwt.verify(token, 'secret')

    user = await User.findById(decoded.id)

    const projects = await Project.find({ 'user._id': user._id }).sort('-createdAt')

    res.status(200).json({ projects })
  }

  static async getProjectById(req, res) {
    const id = req.params.id

    const project = await Project.findById(id)

    if (!project) {
      res.status(400).json({ message: 'Projeto não encontrado!' })
      return
    }

    res.status(200).json({ project })
  }
} 