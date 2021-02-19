import axios from 'axios'
import React, { userState, useEffect, useState } from 'react'
import Header from '../Header/Header'
import { useDispatch, useSelector } from 'react-redux'
//Styling Imports
import './Dashboard.scss'

const Dashboard = (props) => {
    const user = useSelector(state => state.user)
    // const dispatch = useDispatch()
    console.log('user:', user)

    const [recentlyCreated, setRecentlyCreated] = useState([])
    const [recentlyEnded, setRecentlyEnded] = useState([])

console.log(recentlyCreated)

    const createNewPoll = () => {
        props.history.push('/create-poll')

    }

    const yourPolls = () => {
        props.history.push('/:id/polls')

    }

    const login = () => {
        props.history.push('/login')
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
        getRecentPolls()
        getEndedPolls()
    }, [])

    const mappedRecentPolls = recentlyCreated.map(poll => {
        return(
        <div key={poll.poll_id}>
            <span>{poll.subject}</span>
            <span>{JSON.stringify(poll.options)}</span>
            <span>{`${poll.date_created}`}</span>
            <span>{`${poll.expiry_date}`}</span>
        </div>)
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
            <div className='recently-created-polls-box'>
                <h2 className='polls-text' >Recently Created Polls</h2>
                {mappedRecentPolls}
            </div>
            <div className='recently-ended-poll-box'>
                <h2 className='polls-text'>Recently Ended Polls</h2>
                {mappedEndedPolls}
            </div>
            {!user.id
                ?
                <section className='not-loggedin-container'>
                    <h2 className='create-poll-tab' onClick={login}>Login to Create New Poll</h2>
                </section>
                :
                <section className='loggedin-container'>
                    <div className='your-polls-box'>
                        <h1 className='your-polls-text' onClick={yourPolls}>Your Polls</h1>
                    </div>
                    <h2 className='create-poll-tab' onClick={createNewPoll}>Create New Poll</h2>
                </section>
            }
        </div>

    )
}

export default Dashboard;