const {User} = require('../models/user')

exports.getUser = async (req, res) => {
    const userId = req.user // recovered from cookies
    console.log(userId)
    const user = await User.findOne({
        where: { id: userId }
    })
    const sendUser = {
        full_name: user.full_name,
        email: user.email
    }
    res.send(sendUser)
}
