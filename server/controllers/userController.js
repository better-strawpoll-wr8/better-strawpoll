const bcrypt = require('bcryptjs')

module.exports = {
    updateUsername: (req, res) => {
        const { username, id } = req.body
        const db = req.app.get('db')
        db.users.edit_username(username, id)
            .then(([user]) => res.status(200).send(user))
            .catch(err => res.status(500).send(err))
    },

    updatePassword: (req, res) => {
        const { password, id } = req.body
        const db = req.app.get('db')
        let salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        db.users.edit_password(hash, id)
            .then(([user])=> res.status(200).send(user))
            .catch(err => res.status(500).send(err))
    },
    updateEmail: (req, res) => {
        const { email, id } = req.body
        const db = req.app.get('db')
        db.users.edit_email(email, id)
            .then(([user]) => res.status(200).send(user))
            .catch(err => res.status(500).send(err))
    }
}
