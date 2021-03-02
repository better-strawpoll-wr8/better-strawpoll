import React, {userState, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Header from '../Header/Header'
import Results from '../Results/Results'
//Styling Imports
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import './Poll.scss'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import {io} from 'socket.io-client';

const Poll = (props) => {
    const user = useSelector(state => state.user)
    const [poll, setPoll] = useState({})
    const [pollAuthor, setPollAuthor] = useState({})
    const [vote, setVote] = useState('')
    const [voteIndex, setVoteIndex] = useState(0)
    const [options, setOptions] = useState([])
    const [resultsView, setResultsView] = useState(false)
    const pollId = props.match.params.poll_id
    const authorId = poll.user_id
    // console.log('authorId: ',authorId)

    const socket = io("http://localhost:7777")

    useEffect(() =>  {
        axios.get(`/api/poll/${pollId}`)
        .then(res => {
            console.log('data: ',res.data)
            setPoll(res.data)
        })
        .catch(err => console.log(err))
        
    }, [])

    //Runs to get authorID only if poll data is received
    useEffect(() => {
        if(authorId){
            axios.get(`/api/user/${authorId}`)
            .then(res=> {
                console.log('authorinfo:', res.data)
                setPollAuthor(res.data)
            })
            .catch(err => console.log(err))
        }


    }, [poll])
  
    const handleVote = (voteIndex) => {
        console.log(vote)
        console.log(poll.options.optionsListTrim[0].optionName)
        // for(let i=0; i< poll.options.optionsListTrim.length; i++){
        //     if(poll.options.optionsListTrim[i].optionName === vote){
        //         poll.options.optionsListTrim[i].voteCount++
        //         console.log( poll.options.optionsListTrim[i].voteCount)
        //     }
        // }
        poll.options.optionsListTrim[voteIndex].voteCount++
        axios.put('/api/vote', {options: poll.options, pollId})
            .then(res => {
                console.log('res.data:',res.data)
            })
            .catch(err => console.log(err))
        socket.emit('updatedata')
    }

    const handleResults = () => {
        return (
            <Results />
        )
    }
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
                                    <FormControlLabel value={`${i}`} control={<Radio />} label={e.optionName} onClick={() => setVoteIndex(i)}/>
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
            <Button className='vote-buttons' variant='contained' id='vote-btn' onClick={() => handleVote(voteIndex)}>Vote</Button>   
            <Button className='vote-buttons' variant='contained' id='vote-btn' onClick={() => setResultsView(!resultsView)}>View Results</Button>   
            {resultsView && <Results pollId={pollId}/>}
            <section className='comments'>
                <h1>Comments</h1>
            </section>
        </>
    )
}

export default Poll