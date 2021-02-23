import React, {userState, useEffect, useState} from 'react'
import Header from '../Header/Header'
//Styling Imports
import './Poll.scss'
import Button from '@material-ui/core/Button'
import axios from 'axios'


const Poll = (props) => {
    const [poll, setPoll] = useState({})
    const [pollAuthor, setPollAuthor] = useState({})
    const pollId = props.location.state.poll.poll_id
    const authorId = props.location.state.poll.user_id
    console.log('authorId: ',authorId)

    useEffect(() => {
        axios.get(`/api/user/${authorId}`)
            .then(res=> {
                console.log(res.data)
                setPollAuthor(res.data)
            })
            .catch(err => console.log(err))

        axios.get(`/api/poll/${pollId}`)
            .then(res => {
                console.log('data: ',res.data)
                setPoll(res.data)
            })
            .catch(err => console.log(err))
        
        console.log(poll)
    }, [])

    return (
        <>
            <Header />
            <div className='poll'>
                <section>
                    <h2> {poll.subject}</h2>
                    {/* {poll.options.optionsListTrim.map((e, i) => {
                        return (
                            <div key={i}>
                                <span>{JSON.stringify(e.optionName).replace(/["]+/g, '')}: {JSON.stringify(e.voteCount).replace(/["]+/g, '')}</span>
                            </div>)
                    })} */}
                </section>
                <section>
                    <h3>Poll Created By: {pollAuthor.username}</h3>
                    <img className='poll-author-profile-img' src={pollAuthor.profile_picture}/>
                </section>
            </div>
        </>
    )
}

export default Poll