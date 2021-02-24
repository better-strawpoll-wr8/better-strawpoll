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
        axios.get('/api/polls/'+id )
            .then(res => {
                setYourPolls(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    const loggedinView = () => {
        if(!user.id){
            props.history.push('/')
        }
    }

    useEffect(() => {
        getYourPolls()
        loggedinView()
    }, [])


    const mappedYourPolls = yourPolls.map(poll => {
        return(
            <div key={poll.poll_id} className='mapped-poll'>
            <h4> </h4>
            <span className='tlte'> Title: {poll.subject}</span>
            <h4> </h4>
            <span className='date-created'>Date Created: {`${poll.date_created}`}</span>
            <h4> </h4>
            <span className='expiry-date'>Expiry Date: {`${poll.expiry_date}`}</span>
            <h4> </h4>
            <span className='options'>Options:{poll.options.optionsListTrim.map((e, i) => {
                return (
                    <div key={i}>
                        <span>{JSON.stringify(e.optionName).replace(/["]+/g, '')}: {JSON.stringify(e.voteCount).replace(/["]+/g, '')}</span>
                    </div>)
            })}</span>
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