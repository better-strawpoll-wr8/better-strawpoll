import axios from 'axios'
import React, { userState, useEffect, useState } from 'react'
import { useSelector} from 'react-redux'
import { getEndedPolls } from '../../../server/controllers/mainController'
import Header from '../Header/Header'
//Styling Imports
import './Dashboard.scss'



const Dashboard = (props) => {
    const user = useSelector(state=> state.user)

    const [recentlyCreated, setRecentlyCreated] = useState([])
    const [recentlyEnded, setRecentlyEnded] = useState([])
    
    const createNewPoll = () => {
        props.history.push('/create-poll')
    }

    const getRecentPolls = () => {
        const id = user.user_id
        axios.get('/api/recent_polls/')
        .then(res => {
            setRecentlyCreated(res.data)
        })
        .catch(err => console.log(err))
    }

    const getEndedPolls = () => {
        const id = user.user_id
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
            {/* <h1 className='your-polls-text'>Your Polls</h1> */}
                <section>
                    <h2 className='create-poll-tab' onClick={createNewPoll}>Create New Poll</h2>
                    <div className='recently-created-polls-box'>
                        <h2 className='polls-text' >Recently Created Polls</h2>
                       {mappedRecentPolls}
                       {mappedEndedPolls}
                    </div>
                    <div className='recently-ended-poll-box'>
                        <h2 className='polls-text'>Recently Ended Polls</h2>
                    </div>
                </section>
        </div>

    )
}



export default Dashboard;