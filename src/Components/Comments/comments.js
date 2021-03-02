import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import React, {useState} from 'react'

const Comments = (props) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    console.log('user:', user)
    //const pollId = useSelector(state => state.poll)
    const pollId = props.match.params.poll_id
    const [comment, setComment] = useState('')
    const [pollComment, setComments] = useState([])
    console.log(pollId)
    const createComment = () => {
        const userId = user.id 
        axios.post(`/api/comment/${pollId}`, {userId, pollId, comment})
        .then(res => {
            setComments(res.data)
        })
        .catch(err => console.log(err))
    }
    console.log(props)
    const getComments = () => {
        axios.get(`/api/comments/${pollId}`)
        .then(res => {
            setComments(res.data)
        })
        .catch(err => console.log(err))
    }
    console.log(pollComment)
    const mappedComments = pollComment.map(comments => {
        return (
            <span className='commentText'>{comments.comment}</span>
        )
    })

    return (
        <section className='commentBox'>
            <div className='writeComment'>
                <input
                className='comment-input'
                name='commentBody'
                placeholder=''
                value={comment}
                onChange={e => setComment(e.target.value)}
                />
                <button className='comment-button' onClick={() => createComment()}>Add Comment</button>
            </div>
            <div className='allComments'>
                {mappedComments}
            </div>
        </section>
    )
}

export default Comments