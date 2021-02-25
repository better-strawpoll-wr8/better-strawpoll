import axios from 'axios'
import React, { userState, useEffect, useState } from 'react'
import Header from '../Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
//Styling Imports
import './Dashboard.scss'
import Snackbar from '@material-ui/core/Snackbar'
import { Date } from 'prismic-reactjs';

import { Pie } from 'react-chartjs-2';




const Dashboard = (props) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    console.log('user:', user)
    console.log(user)
    const [recentlyCreated, setRecentlyCreated] = useState([])
    const [recentlyEnded, setRecentlyEnded] = useState([])

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

        const colors = poll.options?.optionsListTrim.map(() => '#' + Math.floor(Math.random() * 16777215).toString(16))

        const data = {
            labels: poll.options?.optionsListTrim.map(el => el.optionName),
            datasets: [
                {
                    label: '# of votes',
                    data: poll.options?.optionsListTrim.map(el => el.voteCount),
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1
                }
            ]
        }

        const dateCreatedStr = JSON.stringify(poll.date_created).replace(/["]+/g, '')
        const dateExpStr = JSON.stringify(poll.expiry_date).replace(/["]+/g, '')


        const dateCreated = dateCreatedStr.slice(0, 10)
        const timeCreated = dateCreatedStr.slice(11, 16)

        const dateExp = dateExpStr.slice(0, 10)
        const timeExp = dateExpStr.slice(11, 16)

        return (
            <div className='mapped-poll'>
                <Link to={`/polls/${poll.poll_id}`} key={poll.poll_id}>
                    <h4 className='tlte'> Title: {poll.subject}</h4>
                </Link>
                <h4 className='date-created'>Date Created: {dateCreated} Time: {timeCreated}</h4>
                <h4 className='expiry-date'>Expires: {dateExp} Time: {timeExp}</h4>
                <div className='results'>
                    <Pie data={data} />
                </div>
            </div>
        )

    })

    const mappedEndedPolls = recentlyEnded.map(poll => {

        const colors = poll.options?.optionsListTrim.map(() => '#' + Math.floor(Math.random() * 16777215).toString(16))

        const data = {
            labels: poll.options?.optionsListTrim.map(el => el.optionName),
            datasets: [
                {
                    label: '# of votes',
                    data: poll.options?.optionsListTrim.map(el => el.voteCount),
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1
                }
            ]
        }

        const dateCreatedStr = JSON.stringify(poll.date_created).replace(/["]+/g, '')
        const dateExpStr = JSON.stringify(poll.expiry_date).replace(/["]+/g, '')


        const dateCreated = dateCreatedStr.slice(0, 10)
        const timeCreated = dateCreatedStr.slice(11, 16)

        const dateExp = dateExpStr.slice(0, 10)
        const timeExp = dateExpStr.slice(11, 16)

        return (
            <div className='mapped-poll'>
                <Link to={`/polls/${poll.poll_id}`} key={poll.poll_id}>
                    <h4 className='tlte'> Title: {poll.subject}</h4>
                </Link>
                <h4 className='date-created'>Date Created: {dateCreated} Time: {timeCreated}</h4>
                <h4 className='expiry-date'>Expired: {dateExp} Time: {timeExp}</h4>
                <div className='results'>
                    <Pie data={data} />
                </div>
            </div>
        )
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