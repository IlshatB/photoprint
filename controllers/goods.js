const Good = require('../models/Good')

exports.fetchGood = async (req, res, next) => {
    const { id } = req.params

    try{
        const good = await Good.findById(id);
        res.status(200).json({
            success: true, 
            good
        });
    } catch (e) {
        if (e.message.includes('Cast to ObjectId failed for value')) {
            return res.status(401).send('Неверный ID');
        }

        next(e)
    }
}