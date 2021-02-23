import axios from 'axios'
import React, {userState, useEffect, useState} from 'react'
import { useSelector} from 'react-redux'
//Styling Imports
import './CreatePoll.scss'

const CreatePoll = (props) => {
    const user = useSelector(state => state.user)

    let date = new Date()
    date.setDate(date.getDate() + 7)

    console.log(new Date())
    
    const [subject, setSubject] = useState('')
    const [optionsList, setOptions] = useState([{optionName: '', voteCount: 0}, {optionName: '', voteCount: 0}, {optionName: '', voteCount: 0}])
    const [expiryDate, setExpiryDate] = useState(date.toISOString().slice(0, 10))
    const [expiryTime, setExpiryTime] = useState('00:00')

    const createPoll = () => {
        const optionsListTrim = optionsList.filter(option => option.optionName)
        // checking for at least 2 options
        if (optionsListTrim[0] && optionsListTrim[1]) {
            const id = user.user_id
            axios.post('/api/poll/', {
                id: id, 
                subject: subject, 
                options: {optionsListTrim}, 
                date_created: new Date(), 
                expiry_date: expiryDate + ' ' + expiryTime + ':00'
            })
            //.then push to poll view
            .catch(err => console.log(err))
        }
        else {
            // error message popup
        }
    }

    const handleOptionsChange = (e, index) => {
        const list = [...optionsList]
        list[index].optionName = e.target.value
        setOptions(list)
    }

    const addOption = (index) => {
        if (optionsList.length - 1 === index && optionsList.length < 31) {
            setOptions([...optionsList, {optionName: '', voteCount: 0}])
        }
    }

    return (
        <div className="create-poll">
            <label>
                Subject
                <input
                    name="subject"
                    placeholder="Add poll subject/question"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}/>
            </label>
            <label>Poll Options
                {optionsList.map((element, index) => {
                    return (
                        <input 
                            key={index}
                            name="option"
                            placeholder="Add poll option"
                            value={element.optionName}
                            onChange={e => handleOptionsChange(e, index)}
                            onClick={() => addOption(index)}/>
                    )
                })}
            </label>
            <label>
                Expiration Date
                <input 
                    type="date"
                    value={expiryDate}
                    onChange={e => {setExpiryDate(e.target.value)}}/>
                <input
                    type="time"
                    value={expiryTime}
                    onChange={e => {
                        setExpiryTime(e.target.value)
                        console.log(expiryDate + ' ' + expiryTime)}}/>
            </label>
            <button onClick={() => createPoll()}>Create Poll</button>
        </div>
    )

    /* const [subject, setSubject] = useState('')
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
    ) */
}

export default CreatePoll