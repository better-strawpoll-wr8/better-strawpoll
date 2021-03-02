require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./controllers/authController')
const mainCtrl = require('./controllers/mainController')
const userCtrl = require('./controllers/userController')
const path = require('path')
const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env

const app = express()


app.use(express.json())

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then(db => {
    app.set('db', db)
    console.log('db connected')
    const server = app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))

    const io = require('socket.io')(server, {
        cors: {origin: "*"}
    })
    io.on('connection', (socket) => {
        socket.on('updatedata', () => {
            io.emit('updatedata')
        })
    })
})

//Auth Endpoints
app.post('/api/register', authCtrl.register)
app.post('/api/login', authCtrl.login)
app.get('/api/logout', authCtrl.logout)

//User Endpoints
app.put('/api/:id/updateUsername', userCtrl.updateUsername )
app.put('/api/:id/updatePassword', userCtrl.updatePassword )
app.put('/api/:id/updateEmail', userCtrl.updateEmail )

//Main Endpoints

//            Main Polls
app.post('/api/poll/', mainCtrl.createPoll)
app.delete('/api/poll/:id', mainCtrl.deletePoll) // delete poll by poll id
app.get('/api/polls/:id', mainCtrl.getPolls) // gets user's polls by user id
app.get('/api/poll/:poll_id', mainCtrl.getPoll)
app.get('/api/recent_polls/', mainCtrl.getRecentPolls) 
app.get('/api/ended_polls/', mainCtrl.getEndedPolls)
app.get('/api/user/:authorId', mainCtrl.getUserById)
app.put('/api/vote', mainCtrl.vote)

//           Main Comments
app.post('/api/comment/:poll_id', mainCtrl.createComment)
app.delete('/api/comment/:id', mainCtrl.deleteComment)
app.get('/api/comments/:id', mainCtrl.getComments) // get comments by poll id


app.use(express.static(`${__dirname}/../build`))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
  })
