const { Types } = require('mongoose')
const mongoose = require('../db/conn')
const {Schema} = mongoose

const Project = mongoose.model(
    'Project',
    new Schema({
        name: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: false
        },
        docs: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false
        },
        desc: {
            type: String,
            required: true
        },
        projectSkills: [{
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Skill'
        }],
        user: Object
        
    },
    {timestamps: true},
    )
)

module.exports = Project