module.exports = {

    //Polls

createPoll: async (req,res) => {
    const { id } = req.params
    const { subject, options, date_created, expiry_date } = req.body
    const db = req.app.get('db')
    const [poll] = await db.polls.create_poll({id, subject, options, date_created, expiry_date} )
    res.status(200).send(poll)
},

deletePoll: async (req,res) => {
    const { id } = req.params
    const db = req.app.get('db')
    const [poll] = await db.polls.delete_poll({id})
    res.status(200).send(poll)
},

getPolls: async (req,res) => {
    const { id } = req.params
    const db = req.app.get('db')
    const [polls] = await db.polls.get_polls({id})
    res.status(200).send(polls)
},

//Comments

createComment: async (req,res) => {
    const {user_id} = req.params
    const {poll_id, comment} = req.body
    const [comment1] = await db.comments.create_comment({user_id, poll_id, comment})
    res.status(200).send(comment1)
},

deleteComment: async (req,res) => {
    const { id } = req.params
    const db = req.app.get('db')
    const [comment] = await db.comments.delete_comment({id})
    res.status(200).send(comment)
},

getComments: async (req,res) => {
    const { id } = req.params
    const db = req.app.get('db')
    const [comments] = await db.comments.get_polls({id})
    res.status(200).send(comments)
}

}
