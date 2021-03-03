import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import React, {useEffect, useState} from 'react'

const Comments = (props) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    console.log('user:', user)
    //const pollId = useSelector(state => state.poll)
    const pollId = props.pollId
    const [comment, setComment] = useState('')
    const [pollComment, setPollComment] = useState([])
    const user_id = user.id 
    const createComment = () => {
        console.log('user', user.id)
        axios.post(`/api/comment/${pollId}`, {user_id, comment})
        .then(res => {
            setComment('')
            getComments()
        })
        .catch(err => console.log(err))
    }

    
    const getComments = () => {
        axios.get(`/api/comments/${pollId}`)
        .then(res => {
            setPollComment(res.data)
        })
        .catch(err => console.log(err))
    }
    console.log({pollComment})
    const mappedComments = pollComment.map(comments => {
        return (
            <p className='commentText'>{comments.comment}</p>
        )
    })
    useEffect(() => {
        getComments()
    }, [])
    return (
        <section className='commentBox'>
            {user.id && <div className='writeComment'>
                <textarea
                className='comment-input'
                name='commentBody'
                placeholder=''
                value={comment}
                rows='4'
                cols='50'
                onChange={e => setComment(e.target.value)}
                />
                <button className='comment-button' onClick={() => createComment()}>Add Comment</button>
            </div>}
            <div className='allComments'>
                {mappedComments}
            </div>
        </section>
    )
}

export default Comments