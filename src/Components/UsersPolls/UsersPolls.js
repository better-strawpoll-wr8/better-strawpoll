import axios from 'axios'
import React, {userState, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../Header/Header'
//Styling Imports
import './UsersPolls.scss'

const UsersPolls = (props) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    console.log('user:', user)

const [yourPolls, setYourPolls] = useState([])

const getYourPolls = () => {
        const id = user.user_id
        axios.get('/api/polls/', { id })
            .then(res => {
                setYourPolls(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getYourPolls()
    }, [])

    const mappedYourPolls = yourPolls.map(poll => {
        <div key={poll.poll_id}>
            <span>{poll.subject}</span>
            <span>{poll.dateCreated}</span>
            <span>{poll.expiryDate}</span>
            <span>{poll.options}</span>
        </div>
    })

    return (
        <div className='usersPolls'>
            <Header />
            <h1>Your Polls</h1>
            <main className='polls-box'>
                <h3>Title</h3>
                <h3>Date Created</h3>
                <h3>Expiry Date</h3>
                <h3># of Participants</h3>
             {mappedYourPolls}
             </main>
        </div>
    )
}

export default UsersPolls