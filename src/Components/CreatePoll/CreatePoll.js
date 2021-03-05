import axios from 'axios'
import React, {userState, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Header from '../Header/Header'
//Styling Imports
import './CreatePoll.scss'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
// import 'fontsource-roboto';

const CreatePoll = (props) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    console.log(user)

    let date = new Date()
    date.setDate(date.getDate() + 7)
    

    const [subject, setSubject] = useState('')
    const [optionsList, setOptions] = useState([{optionName: '', voteCount: 0}, {optionName: '', voteCount: 0}, {optionName: '', voteCount: 0}])
    const [expiryDate, setExpiryDate] = useState(date.toISOString().slice(0, 10))
    const [expiryTime, setExpiryTime] = useState('00:00')
    

    const createPoll = () => {
        const optionsListTrim = optionsList.filter(option => option.optionName)
        // checking for at least 2 options
        if (optionsListTrim[0] && optionsListTrim[1]) {
            const id = user.id
            console.log(id)
            axios.post('/api/poll/', {
                id: id, 
                subject: subject, 
                options: {optionsListTrim}, 
                date_created: new Date(), 
                expiry_date: expiryDate + ' ' + expiryTime + ':00'
            })
            //.then push to poll view
            .catch(err => console.log(err))
            props.history.push('/')
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

    const loggedinView = () => {
        if(!user.id){
            console.log(user)
            // props.history.push('/')
        }
    }

    useEffect(() => {
       loggedinView()
    }, [])

    

    return (


        
        <div className="create-poll">
            <Header history={props.history}/>
            <main className='content'>
                <div className='data'>
            <label className='data-lable'>
                Subject:
                <TextField
                variant="outlined"
                className='data-input'
                    name="subject"
                    placeholder="Add poll subject/question"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}/>
            </label>
            <label className='data-lable'>Poll Options:
                {optionsList.map((element, index) => {
                    return (
                        <TextField
                        variant="outlined"
                        className='data-input'
                            key={index}
                            name="option"
                            placeholder="Add poll option"
                            value={element.optionName}
                            onChange={e => handleOptionsChange(e, index)}
                            onClick={() => addOption(index)}/>
                    )
                })}
            </label>
            <label className='data-lable'>
                Expiration Date:
                <TextField
                variant="outlined"
                className='data-input'
                    type="date"   //try manipulating this
                    value={expiryDate}
                    onChange={e => {setExpiryDate(e.target.value)}}/>
                <TextField
                variant="outlined"
                className='data-input'
                    type="time"  //try manipulating this
                    value={expiryTime}
                    onChange={e => setExpiryTime(e.target.value)}/>
            </label>
            </div>
            <Button className='create-button' onClick={() => createPoll()}>Create Poll</Button>
            </main>
        </div>
    )

   
}

export default CreatePoll