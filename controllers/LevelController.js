const Level = require('../models/Level');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const getToken = require('../helpers/get-token');

module.exports = class LevelController {
  static async create(req, res) {
    const { proficiency, technology } = req.body;

    if (!proficiency) {
      res.status(422).json({ message: 'Informe o seu nível de proficiência.' });
      return
    }

    if (!technology) {
      res.status(422).json({ message: 'Informe a tecnologia.' });
      return
    }

    var user
    const token = getToken(req)
    const decoded = jwt.verify(token, 'secret')

    user = await User.findById(decoded.id)

    const level = new Level({
      proficiency: proficiency,
      technology: technology,
      owner: {
        _id: user._id,
      }
    });
    try {
      const newLevel = await level.save();
      res.status(200).json({message: 'Skill adicionada', newLevel});
    } catch (error) {
      res.status(500).json({message: error});
    }
  }

  static async getUserSkills(req, res) {
    var user
    const token = getToken(req);
    const decoded = jwt.verify(token, 'secret');

    user = await User.findById(decoded.id)

    const levels = await Level.find({ 'user._id': user._id }).populate('technology').sort('-createdAt')

    res.status(200).json({ levels })
  }
}