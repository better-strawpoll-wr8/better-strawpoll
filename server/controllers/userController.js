module.exports = {
    updateUsername: (req, res) => {
        const { id } = req.params
        const { username } = req.body
        const db = req.app.get('db')
        db.users.edit_username(username, id)
            .then((user) => res.status(200).send(user))
            .catch(err => res.status(500).send(err))
    },

    updatePassword: (req, res) => {
        const { id } = req.params
        const { password } = req.body
        const db = req.app.get('db')
        db.users.edit_password(password, id)
            .then((user)=> res.status(200).send(user))
            .catch(err => res.status(500).send(err))
    },

    updateEmail: (req, res) => {
        const { id } = req.params
        const { email } = req.body
        const db = req.app.get('db')
        db.users.edit_email(email, id)
            .then((user) => res.status(200).send(user))
            .catch(err => res.status(500).send(err))
    }
}
