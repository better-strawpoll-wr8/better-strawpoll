import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Pie } from 'react-chartjs-2';
//Styling Imports
import './Dashboard.scss'
import Button from '@material-ui/core/Button'

const Dashboard = (props) => {
    const user = useSelector(state => state.user)

    const [recentlyCreated, setRecentlyCreated] = useState([])
    const [recentlyEnded, setRecentlyEnded] = useState([])

    //The below functions act as links to redirect the user to other views.
    const createNewPoll = () => {
        props.history.push('/create-poll')
    }

    const yourPolls = () => {
        props.history.push('/:id/polls')
    }

    const login = () => {
        props.history.push('/login')
    }

    //Gets all the recently created polls by date and time created.
    const getRecentPolls = () => {
        axios.get('/api/recent_polls/')
            .then(res => {
                setRecentlyCreated(res.data)
            })
            .catch(err => console.log(err))
    }

    //Gets the last 10 expired polls.
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

        // console.log('cookie info: ',Cookies.get('cookie') )
    }, [])


    const mappedRecentPolls = recentlyCreated.map(poll => {
        //Assigns random colors to colors variable which will be 
        //  applied to the pie chart.
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
        //Rearranges the timestamp of date and time created and 
        //  expired to be more easily read and broken into date 
        //  and time for each mapped poll.
        const dateCreatedStr = JSON.stringify(poll.date_created).replace(/["]+/g, '')
        const dateExpStr = JSON.stringify(poll.expiry_date).replace(/["]+/g, '')

        const dateCreated = dateCreatedStr.slice(0, 10)
        const timeCreated = dateCreatedStr.slice(11, 16)

        const dateExp = dateExpStr.slice(0, 10)
        const timeExp = dateExpStr.slice(11, 16)

        return (
            <div className='mapped-poll'>
                <Link to={`/polls/${poll.poll_id}`} key={poll.poll_id}>
                    <h4 className='tlte'>{poll.subject}</h4>
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
        //Assigns random colors to colors variable which will be applied to the pie chart.
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
        //Rearranges the timestamp of date and time creadted and expired to be more easily read and broken into date and time for each mapped poll.
        const dateCreatedStr = JSON.stringify(poll.date_created).replace(/["]+/g, '')
        const dateExpStr = JSON.stringify(poll.expiry_date).replace(/["]+/g, '')

        const dateCreated = dateCreatedStr.slice(0, 10)
        const timeCreated = dateCreatedStr.slice(11, 16)

        const dateExp = dateExpStr.slice(0, 10)
        const timeExp = dateExpStr.slice(11, 16)

        return (
            <div className='mapped-poll'>
                <Link to={`/polls/${poll.poll_id}`} key={poll.poll_id}>
                    <h4 className='tlte'>{poll.subject}</h4>
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
                            <Button className='poll-buttons' variant='contained' id='vote-btn' onClick={login}>Login to Create New Poll</Button> 
                        </div>
                    </section>
                    :
                    <section className='loggedin-container'>
                        <div className='your-polls-box'>
                            <Button className='poll-buttons' variant='contained' id='vote-btn' onClick={yourPolls}>View Your Polls</Button>
                        </div>
                        <div className='tabs'>
                            <Button className='poll-buttons' variant='contained' id='vote-btn' onClick={createNewPoll}>Create New Poll</Button> 
                        </div>
                    </section>
                }
            </section>
        </div>
    )
}

export default Dashboard;