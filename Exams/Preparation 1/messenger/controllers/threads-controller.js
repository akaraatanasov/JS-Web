const mongoose = require('mongoose')
const Thread = mongoose.model('Thread')
//const Thread = require('../models/Thread')
const Message = require('../models/Message')
const User = require('../models/User')
const messageChecker = require('../util/messageChecker')

module.exports = {
    chatRoom: {
        get: (req, res) => {
            let currentUser = req.user.username
            let otherUser = req.params.username

            Thread.findOne({ users: { $all: [currentUser, otherUser] } })
                .then(existingThread => {
                    if (!existingThread) {
                        return res.redirect('/?error=Thread no longer exists')
                    }

                    let data = {}

                    User.findOne({ username: otherUser }).then(secondUser => {
                        if (!secondUser) {
                            return res.redirect('/?error=User no longer exists')
                        }

                        if (!secondUser.blockedUsers) {
                            secondUser.blockedUsers = []
                            secondUser.save()
                        } else {
                            if (secondUser.blockedUsers.indexOf(req.user._id) !== -1) {
                                data.blocked = true
                            }
                        }
                    })
                    
                    Message.find({ thread: existingThread._id })
                        .sort({ dateCreated: 1 })
                        .populate('user')
                        .then(messages => {
                            //for messages from the old schema - not good preformance wise
                            for (let msg of messages) {
                                if (messageChecker.isLink(msg.content)) {
                                    msg.isLink = true
                                }

                                if (messageChecker.isImage(msg.content)) {
                                    msg.isImage = true
                                }
                            }

                            data.messages = messages

                            res.render('thread/chat-room', data)
                        })
                        .catch(console.warn)
                })
        },
        post: (req, res) => {
            let currentUser = req.user.username
            let otherUser = req.params.username
            let messageContent = req.body.content

            Thread.findOne({ users: { $all: [currentUser, otherUser] } })
                .then(existingThread => {
                    if (!existingThread) {
                        return res.redirect('/error=Thread does not exist')
                    }

                    let messageData = {
                        thread: existingThread._id,
                        content: messageContent,
                        user: req.user._id,
                        dateCreated: Date.now(),
                        isLink: messageChecker.isLink(messageContent),
                        isImage: messageChecker.isImage(messageContent)
                    }

                    Message.create(messageData)
                        .then(msgContent => {
                            res.redirect(`/thread/${otherUser}`)
                        })
                        .catch(err => {
                            res.redirect(`/thread/${otherUser}?error=${err.errors.content.message}`)
                        })
                })

            //res.redirect(`/thread/${otherUser}`)
        }
    }
}