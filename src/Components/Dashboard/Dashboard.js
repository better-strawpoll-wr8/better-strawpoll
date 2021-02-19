import axios from 'axios'
import React, { userState, useEffect, useState } from 'react'
import Header from '../Header/Header'
import { useDispatch, useSelector } from 'react-redux'
//Styling Imports
import './Dashboard.scss'


const Dashboard = (props) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    console.log('user:',user)

    const [yourPolls, setYourPolls] = useState([])
    const [recentlyCreated, setRecentlyCreated] = useState([])
    const [recentlyEnded, setRecentlyEnded] = useState([])

    const createNewPoll = () => {
        props.history.push('/create-poll')
    }

    const getYourPolls = () => {
        const id = user.user_id
        axios.get('/api/polls/', { id })
            .then(res => {
                setYourPolls(res.data)
            })
            .catch(err => console.log(err))
    }

    const getRecentPolls = () => {
        axios.get('/api/recent_polls/')
            .then(res => {
                setRecentlyCreated(res.data)
            })
            .catch(err => console.log(err))
    }

    const getEndedPolls = () => {

        axios.get('/api/ended_polls/')
            .then(res => {
                setRecentlyEnded(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getYourPolls()
        getRecentPolls()
        getEndedPolls()
    }, [])

    const mappedYourPolls = yourPolls.map(poll => {
        <div key={poll.poll_id}>
            <span>{poll.subject}</span>
            <span>{poll.options}</span>
            <span>{poll.dateCreated}</span>
            <span>{poll.expiryDate}</span>
        </div>
    })

    const mappedRecentPolls = recentlyCreated.map(poll => {
        <div key={poll.poll_id}>
            <span>{poll.subject}</span>
            <span>{poll.options}</span>
            <span>{poll.dateCreated}</span>
            <span>{poll.expiryDate}</span>
        </div>
    })

    const mappedEndedPolls = recentlyEnded.map(poll => {
        <div key={poll.poll_id}>
            <span>{poll.subject}</span>
            <span>{poll.options}</span>
            <span>{poll.dateCreated}</span>
            <span>{poll.expiryDate}</span>
        </div>
    })

    return (
        <div className='dashboard'>
            <Header />
            <div className='your-polls-box'>
                <h1 className='your-polls-text'>Your Polls</h1>
                {mappedYourPolls}
            </div>
            <h2 className='create-poll-tab' onClick={createNewPoll}>Create New Poll</h2>
            <div className='recently-created-polls-box'>
                <h2 className='polls-text' >Recently Created Polls</h2>
                {mappedRecentPolls}
            </div>
            <div className='recently-ended-poll-box'>
                <h2 className='polls-text'>Recently Ended Polls</h2>
                {mappedEndedPolls}
            </div>
        </div>

    )
}

export default Dashboard;