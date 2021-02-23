import axios from 'axios'
import React, {userState, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {updateUser} from '../../redux/reducer'
import Header from '../Header/Header'
//Styling Imports
import './UsersPolls.scss'

const UsersPolls = (props) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    console.log('user:', user)

const [yourPolls, setYourPolls] = useState([])

const getYourPolls = () => {
        const id = user.id
        console.log(id)
        axios.get('/api/polls/', { id })
            .then(res => {
                setYourPolls(res.data)
            })
            .catch(err => console.log(err))
    }

    console.log(yourPolls)

    useEffect(() => {
        getYourPolls()
    }, [])

    const mappedYourPolls = yourPolls.map(poll => {
        return(
            <div key={poll.poll_id}>
                 <span>Title: {poll.subject}</span>
                <span>Date Created: {`${poll.date_created}`}</span>
                <span>Expiry Date: {`${poll.expiry_date}`}</span>
                <span># of participants: {JSON.stringify(poll.options)}</span>
            </div>)
    })

    return (
        <div className='usersPolls'>
            <Header />
            <h1>Your Polls</h1>
            <main className='polls-box'>
             {mappedYourPolls}
             </main>
        </div>
    )
}

export default UsersPolls