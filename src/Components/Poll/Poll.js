import React, {userState, useEffect, useState} from 'react'
import Header from '../Header/Header'
//Styling Imports
import './Poll.scss'
import Button from '@material-ui/core/Button'
import axios from 'axios'


const Poll = (props) => {
    const [poll, setPoll] = useState({})
    const id = props.location.state.poll.poll_id

    useEffect(() => {
        axios.get(`/api/poll/${id}`)
            .then(res => {
                console.log('data: ',res.data)
                setPoll(res.data)
            })
            .catch(err => console.log(err))
        
        console.log(poll)
    }, [])

    return (
        <div className='poll'>
            <Header />
            Poll Page
        </div>
    )
}

export default Poll