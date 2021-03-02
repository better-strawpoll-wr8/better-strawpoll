import React, { userState, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../Header/Header'
import Results from '../Results/Results'
import ShareSocials from '../ShareSocials/ShareSocials'
import Cookies from 'js-cookie'
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
    let cookiePolls = JSON.parse(Cookies.get('cookie'))
    console.log(cookiePolls)
    const [poll, setPoll] = useState({})
    const [pollAuthor, setPollAuthor] = useState({})
    const [vote, setVote] = useState('')
    const [voteIndex, setVoteIndex] = useState(0)
    const [options, setOptions] = useState([])
    const [resultsView, setResultsView] = useState(false)
    const pollId = props.match.params.poll_id
    let voted = cookiePolls.includes(pollId)
    const authorId = poll.user_id

    useEffect(() => {
        axios.get(`/api/poll/${pollId}`)
            .then(res => {
                setPoll(res.data)
            })
            .catch(err => console.log(err))
    }, [])


    //Runs to get authorID only if poll data is received
    useEffect(() => {
        if (authorId) {
            axios.get(`/api/user/${authorId}`)
                .then(res => {
                    setPollAuthor(res.data)
                })
                .catch(err => console.log(err))
        }


    }, [poll])
    const handleVote = (voteIndex) => {
        poll.options.optionsListTrim[voteIndex].voteCount++
        axios.put('/api/vote', { options: poll.options, pollId })
            .then(res => {
                console.log('res.data:', res.data)
                if (!cookiePolls.includes(pollId)) {
                    cookiePolls.push(pollId)
                    Cookies.set('cookie', JSON.stringify(cookiePolls), { expires: 7 })
                    voted = true
                    setResultsView(!resultsView)
                } else {
                    console.log('user has already voted')
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <main className='whole-component'>
            <Header />
            <div className='poll'>
                <section className='author-box'>
                    <h3>Poll Created By: {pollAuthor.username}</h3>
                    <img className='poll-author-profile-img' src={pollAuthor.profile_picture} />
                </section>
                <div className='poll-and-buttons'>
                    <section className='poll-box'>
                        <h2> {poll.subject}</h2>
                        {/* poll.options needs ? to work around the issue of not getting data in time of jsx */}
                        {voted
                            ? <div>You have already voted</div>
                            :
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Options</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" >
                                    <span className='options'>{poll.options?.optionsListTrim.map((e, i) => {
                                        return (
                                            <div key={i}>
                                                <FormControlLabel value={`${i}`} control={<Radio />} label={e.optionName} onClick={() => setVoteIndex(i)} />
                                            </div>)
                                    })}</span>
                                </RadioGroup>
                            </FormControl>
                        }
                    </section>
                </div>
                {!voted &&
                    <Button className='vote-buttons' variant='contained' id='vote-btn' onClick={() => handleVote(voteIndex)}>Vote</Button>
                }
                <Button className='vote-buttons' variant='contained' id='vote-btn' onClick={() => setResultsView(!resultsView)}>View Results</Button>
            </div>
            <div className='results-box'>

                <div className='results'>
                    {resultsView && <Results pollId={pollId} />}
                </div>
            </div>
            <section className='comments'>
                <h1>Comments</h1>
            </section>
            <h2>Share this poll!</h2>
            <ShareSocials shareUrl={`/api/poll/${pollId}`} />
        </main >
    )
}

export default Poll