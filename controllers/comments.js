const Comment = require('../models/Comment')
const Good = require('../models/Good')

exports.createComment = async (req, res, next) => {
    const data = req.body
    try {
        const comment = await Comment.create({ ...data })
        try {
            const good = await Good.findById(comment.good.toString())
            good.comments = [...good?.comments, comment]
            await good.save()

            res.status(201).json({ success: true, good })
        } catch (e) {
            next(e)
        }
    } catch (e) {
        next(e)
    }
}
