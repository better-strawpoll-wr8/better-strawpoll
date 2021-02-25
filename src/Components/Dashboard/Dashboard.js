import axios from 'axios'
import React, { userState, useEffect, useState } from 'react'
import Header from '../Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
//Styling Imports
import './Dashboard.scss'
import Snackbar from '@material-ui/core/Snackbar'
import Results from '../Results/Results'



const Dashboard = (props) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    console.log('user:', user)
    console.log(user)
    const [recentlyCreated, setRecentlyCreated] = useState([])
    const [recentlyEnded, setRecentlyEnded] = useState([])

    // console.log(recentlyCreated)

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
        return (
            <Link to={`/polls/${poll.poll_id}`} key={poll.poll_id} className='mapped-poll'>
                <h4 className='tlte'> Title: {poll.subject}</h4>
                <h4 className='date-created'>Date Created: {`${poll.date_created}`}</h4>
                <h4 className='expiry-date'>Expiry Date: {`${poll.expiry_date}`}</h4>
                <div className='results'>
                    
                </div>
                {/* <h4 className='options'>Options:{poll.options.optionsListTrim.map((e, i) => {
                    return (
                        <div key={i}>
                            <h4>{JSON.stringify(e.optionName).replace(/["]+/g, '')}: {JSON.stringify(e.voteCount).replace(/["]+/g, '')}</h4>
                        </div>)
                })}</h4> */}
            </Link>)
    })

    const mappedEndedPolls = recentlyEnded.map(poll => {
        return (
            <Link to={{ pathname: `/polls/${poll.poll_id}`, state: { poll } }} key={poll.poll_id} className='mapped-poll'>
                <h4 className='tlte'> Title: {poll.subject}</h4>
                <h4 className='date-created'>Date Created: {`${poll.date_created}`}</h4>
                <h4 className='expiry-date'>Expiry Date: {`${poll.expiry_date}`}</h4>
                <div className='results'>

                </div>
                {/* <h4 className='options'>Options: {poll.options.optionsListTrim.map((e, i) => {
                    return (
                        <div key={i}>
                            <h4>{JSON.stringify(e.optionName).replace(/["]+/g, '')}: {JSON.stringify(e.voteCount).replace(/["]+/g, '')}</h4>
                        </div>)
                })}</h4> */}
            </Link>)
    })



    return (
        <div className='dashboard'>
            <Header history={props.history} />
            <section className='content'>
                <main className='boxes'>
                    <div className='recently-created-polls-box'>
                        <h2 className='polls-text' >Recently Created Polls</h2>
                        <div className='data'>
                            {mappedRecentPolls}
                        </div>
                    </div>
                    <div className='recently-ended-poll-box'>
                        <h2 className='polls-text'>Recently Ended Polls</h2>
                        <div className='data'>
                            {mappedEndedPolls}
                        </div>
                    </div>
                </main>

                {!user.id
                    ?
                    <section className='not-loggedin-container'>
                        <div className='tabs'>
                            <h2 className='login' onClick={login}>Login to Create New Poll</h2>
                        </div>
                    </section>
                    :
                    <section className='loggedin-container'>
                        <div className='your-polls-box'>
                            <h2 className='your-polls-text' onClick={yourPolls}>View Your Polls</h2>
                        </div>
                        <div className='tabs'>
                            <h2 className='create-poll-tab' onClick={createNewPoll}>Create New Poll</h2>
                        </div>
                    </section>
                }
            </section>
        </div>
    )
}

export default Dashboard;