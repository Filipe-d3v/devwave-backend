const mongoose = require('../db/conn');
const {Schema} = mongoose;

const Level = mongoose.model(
  'Level',
  new Schema({
    proficiency: {
      type: Number,
      required: true
    },
    technology: {
      type: Schema.Types.ObjectId,
      ref: 'Skill',
      required: true
    },
    owner: Object,
  }, {timestamps: true})
);

module.exports = Level;