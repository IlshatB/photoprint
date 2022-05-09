const Comment = require('../models/Comment')

exports.createComment = async (req, res, next) => {
    const data = req.body
    try {
       await Comment.create({ ...data })
        res.status(201).json({ success: true })
    } catch (e) {
        next(e)
    }
}
