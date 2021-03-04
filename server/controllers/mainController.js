module.exports = {

    //Polls

    createPoll: async (req, res) => {
        const { id, subject, options, date_created, expiry_date } = req.body
        const db = req.app.get('db')
        const [poll] = await db.polls.create_poll([id, subject, options, date_created, expiry_date])
        res.status(200).send(poll)
    },

    deletePoll: async (req, res) => {
        const { id } = req.params
        const db = req.app.get('db')
        const [poll] = await db.polls.delete_poll([id])
        res.status(200).send(poll)
    },

    getPolls: async (req, res) => {
        const { id } = req.params
        const db = req.app.get('db')
        const polls = await db.polls.get_polls([id])
        res.status(200).send(polls)
    },

    getRecentPolls: async (req, res) => {
        const db = req.app.get('db')
        const polls = await db.polls.get_recent_polls()
        res.status(200).send(polls)
    },

    getEndedPolls: async (req, res) => {
        const db = req.app.get('db')
        const polls = await db.polls.get_ended_polls()
        res.status(200).send(polls)
    },

    getPoll: async (req, res) => {
        const { poll_id } = req.params
        const db = req.app.get('db')
        const [poll] = await db.polls.get_poll([poll_id])
        res.status(200).send(poll)
    },

    getUserById: async (req, res) => {
        const { authorId  } = req.params
        const db = req.app.get('db')
        console.log('id: ', authorId)
        const [user] = await db.users.get_user_by_id([authorId])
        res.status(200).send(user)
    },

    vote: async(req, res) => {
        const {options, pollId} = req.body
        const db = req.app.get('db')
        console.log('options in vote:',options)
        console.log('pollid in vote:',pollId)
        const [poll] = await db.polls.update_vote([options, pollId])
        res.status(200).send(poll)
        
    },

    //Comments

    createComment: async (req, res) => {
        const { poll_id } = req.params
        const { user_id, username, profile_picture, comment } = req.body
        const db = req.app.get('db')
        const [comment1] = await db.comments.create_comment([user_id, username, profile_picture, poll_id, comment])
        res.sendStatus(200)
    },

    deleteComment: async (req, res) => {
        const { id } = req.params
        const db = req.app.get('db')
        await db.comments.delete_comment([id])
        res.sendStatus(200)
    },

    getComments: async (req, res) => {
        const { poll_id } = req.params
        const db = req.app.get('db')
        const comments = await db.comments.get_comments([poll_id])
        res.status(200).send(comments)
    }

}
