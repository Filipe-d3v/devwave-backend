const mongoose = require('../db/conn')
const {Schema} = mongoose

const FeedBack = mongoose.model(
    'FeedBack',
    new Schema({
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        project: {
            type: mongoose.Types.ObjectId,
            ref: 'Project',
            required: true
        },
        owner: Object,
    },
    {timestamps: true},
    )
)

module.exports = FeedBack