const mongoose = require('mongoose')

let messageSchema = new mongoose.Schema({
    content: { type: mongoose.Schema.Types.String, required: true },
    dateCreated: { type: mongoose.Schema.Types.Date, required: true, default: Date.now() },
    thread: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Thread' },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    isLink: { type: mongoose.Schema.Types.Boolean, default: false },
    isImage: { type: mongoose.Schema.Types.Boolean, default: false }
})
messageSchema.path('content').validate(function () {
    return this.content.length <= 1000
})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message