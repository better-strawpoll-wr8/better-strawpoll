import axios from 'axios'
import React, {userState, useEffect, useState} from 'react'
import { useSelector} from 'react-redux'
//Styling Imports
import './CreatePoll.scss'

const CreatePoll = (props) => {
    const user = useSelector(state=> state.user)

    const [subject, setSubject] = useState('')
    const [options, setOptions] = useState({})
    const [dateCreated, setDateCreated] = useState('')
    const [expiryDate, setExpiryDate] = useState('')


    const createPost = () => {
        const id = user.user_id
        axios.post('/api/poll/', {id, subject, options, dateCreated, expiryDate})
        .then(() => {
            setSubject('')
            setOptions({})
            setDateCreated('')
            setExpiryDate('')
            setCreateView(false)
        })
        .catch(err => console.log(err))
    }

    return (
        <div className= 'create-poll'>
            <input className='poll-input' value={subject}
                        onChange={e => setSubject(e.target.value)}  />
                        <input className='poll-input' value={options}
                        onChange={e => setOptions(e.target.value)}/>
                        <input className='poll-input' value={dateCreated}
                        onChange={e => setDateCreated(e.target.value)}/>
                        <input className='poll-input' value={expiryDate}
                        onChange={e => setExpiryDate(e.target.value)}/>
                        <button onClick={createPost}>Create Poll</button>
        </div>
    )
}

export default CreatePoll