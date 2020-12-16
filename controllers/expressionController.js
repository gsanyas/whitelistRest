const replaceAllRegexSpecial = str => {
    var mystr = str
    const regexSpecial = "?[$#+-|'.,!^()]/{}=<>"
    regexSpecial.split('').forEach(c => {
        mystr = mystr.replace(new RegExp("\\"+c,"g"),"\\"+c)
    })
    return mystr
}

exports.addRegular = (list,regularList) => async (req,res) => {
    const userId = req.user // obtained from filter
    const expression = req.body.expression
    if (expression === null) res.status(404).send('Expression required')
    if (! expression.match(/.*@.*/)) res.sendStatus(422)
    if (expression.match(/.*\*.*/)) {
        const regex = replaceAllRegexSpecial(expression).replace(/\*/g, ".*")
        try {
            await regularList.create({
                user_expression: expression,
                expression: regex,
                fk_user: userId,
            })
            res.sendStatus(201)
        } catch(error) {
            res.sendStatus(502)
        }
    }
    else {
        try {
            await list.create({
                email: expression,
                fk_user: userId,
            })
            res.sendStatus(201)
        } catch (error) {
            res.sendStatus(502)
        }
    }
}

// in progress
exports.getRegular = (list,regularList) => async (req,res) => {
    const userId = req.user;
    const expressions = await regularList.findAll({
        where: {
            fk_user: userId
        }
    })
    res.status(200).send(expressions.map(e => e))
}
