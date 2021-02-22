const { getHistory, filterHistory } = require('../services/historyService')
const { internalError } = require('../utils')

exports.getHistory = async (req, res) => {
    try {
        const history_list = await getHistory(req.user.id)
        res.status(200).json(history_list.map(filterHistory))
    } catch (_err) {
        res.status(500).json(internalError)
    }
}
