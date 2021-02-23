import axios from 'axios'
import React, { userState, useEffect, useState } from 'react'
import Header from '../Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
//Styling Imports
import './Dashboard.scss'
import Snackbar from '@material-ui/core/Snackbar'



const Dashboard = (props) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    // console.log('user:', user)

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
            </Link>)
    })

    const mappedEndedPolls = recentlyEnded.map(poll => {
        return (
            <Link to={{ pathname:`/polls/${poll.poll_id}`, state: {poll} }} key={poll.poll_id} className='mapped-poll'>
                <h4> </h4>
                <span className='tlte'> Title: {poll.subject}</span>
                <h4> </h4>
                <span className='date-created'>Date Created: {`${poll.date_created}`}</span>
                <h4> </h4>
                <span className='expiry-date'>Expiry Date: {`${poll.expiry_date}`}</span>
                <h4> </h4>
                <span className='options'>Options: {poll.options.optionsListTrim.map((e, i) => {
                    return (
                        <div key={i}>
                            <span>{JSON.stringify(e.optionName).replace(/["]+/g, '')}: {JSON.stringify(e.voteCount).replace(/["]+/g, '')}</span>
                        </div>)
                })}</span>
            </Link>)
    })


    // const mappedEndedPolls = recentlyEnded.map(poll => {
    //     return (
    //         <div key={poll.poll_id} className='mapped-poll'>
    //             <h4> </h4>
    //             <span className='tlte'> Title: {poll.subject}</span>
    //             <h4> </h4>
    //             <span className='date-created'>Date Created: {`${poll.date_created}`}</span>
    //             <h4> </h4>
    //             <span className='expiry-date'>Expiry Date: {`${poll.expiry_date}`}</span>
    //             <h4> </h4>
    //             <span className='options'>Options: {JSON.stringify(poll.options.optionsListTrim.map((e, i) => {
    //                 return (
    //                     <div key={i}>
    //                         <span>{e.optionName}: {e.voteCount}</span>
    //                     </div>)
    //             }))}</span>
    //         </div>)
    // })

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