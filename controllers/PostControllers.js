const Post = require('../models/Post');
const User = require('../models/User');

const getToken = require('../helpers/get-token');
const jwt = require('jsonwebtoken');

module.exports = class PostController {
 static async create(req, res) {
  const { subtitle, project } = req.body

  if(!subtitle){
    res.status(400).json({message: 'A legenda é obrigatória'});
    return
  }

  if(!project){
    res.status(400).json({message: 'Projeto não selecionado'});
    return
  }

  var user
  const token = getToken(req)
  const decoded = jwt.verify(token, 'secret')

  user = await User.findById(decoded.id)

  const post = new Post({
   subtitle: subtitle,
   date: new Date().toLocaleString(),
   project: project,
   user:{
    _id: user._id,
    name: user.name,
    surname: user.surname,
    image: user.image,
   }
  })
  try {
   await post.save();
   const newPost = await Post.findById(post._id).populate('project', ['name', 'image', 'link'])
   res.status(200).json({message: 'Postado!', post: newPost}) 
  } catch (error) {
   res.status(500).json({message: error})
  }
 }

 static async getAll(req, res) {

  const posts = await Post.find().populate('project', ['name', 'image', 'link']).sort('-createdAt')
  res.status(200).json({ posts: posts, })
 }
}