import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import {updateUser} from '../../redux/reducer'
import { Link } from 'react-router-dom'
import { Pie } from 'react-chartjs-2';
import Header from '../Header/Header'
//Styling Imports
import './UsersPolls.scss'

const UsersPolls = (props) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [yourPolls, setYourPolls] = useState([])

    const getYourPolls = () => {
        const id = user.id
        axios.get('/api/polls/' + id)
            .then(res => {
                setYourPolls(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    const loggedinView = () => {
        if (!user.id) {
            props.history.push('/')
        }
    }

    useEffect(() => {
        getYourPolls()
        loggedinView()
    }, [])

    const mappedYourPolls = yourPolls.map(poll => {

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

    return (
        <div className='usersPolls'>
            <Header history={props.history} />
            <div className='userPolls-container'>
                <h2>Your Polls</h2>
                <main className='polls-box'>
                    {mappedYourPolls}
                </main>
            </div>
        </div>
    )
}

export default UsersPolls