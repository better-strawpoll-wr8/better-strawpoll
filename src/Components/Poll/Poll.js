import React, {userState, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Header from '../Header/Header'
import Comments from '../Comments/comments'
//Styling Imports
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import './Poll.scss'
import Button from '@material-ui/core/Button'
import axios from 'axios'


const Poll = (props) => {
    const user = useSelector(state => state.user)
    const [poll, setPoll] = useState({})
    const [pollAuthor, setPollAuthor] = useState({})
    const pollId = props.match.params.poll_id
    const authorId = poll.user_id
    // console.log('authorId: ',authorId)

    useEffect(() =>  {
        axios.get(`/api/poll/${pollId}`)
        .then(res => {
            console.log('data: ',res.data)
            setPoll(res.data)
        })
        .catch(err => console.log(err))
        
    }, [])

    //Runs to get authorID only if poll data is received
    useEffect(async() => {
        axios.get(`/api/user/${authorId}`)
        .then(res=> {
            console.log('authorinfo:', res.data)
            setPollAuthor(res.data)
        })
        .catch(err => console.log(err))
    }, [poll])
  
        console.log('POLL VARIABLE:',props)
        console.log(poll.options)
    return (
        <>
            <Header />
            <div className='poll'>
                <section>
                    <h2> {poll.subject}</h2>
                    {/* poll.options needs ? to work around the issue of not getting data in time of jsx */}
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Options</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" >
                        <span className='options'>{poll.options?.optionsListTrim.map((e, i) => {
                            return (
                                <div key={i}>
                                    <FormControlLabel value={e.optionName} control={<Radio />} label={e.optionName} />
                                </div>)
                            })}</span>
                        </RadioGroup>
                    </FormControl>
                </section>
                <section>
                    <h3>Poll Created By: {pollAuthor.username}</h3>
                    <img className='poll-author-profile-img' src={pollAuthor.profile_picture}/>
                </section>
            </div>
            <Button className='poll-buttons' variant='contained' id='vote-btn'>Vote</Button>   
            <Button className='poll-buttons' variant='contained' id='vote-btn'>View Results</Button>   
            <section className='comments'>
                <Comments/>
            </section>
        </>
    )
}

export default Poll