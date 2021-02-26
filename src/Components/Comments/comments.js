import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import React, {useState} from 'react'

const Comments = (props) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    console.log('user:', user)
    const pollId = props.match.params.poll_id
    const [commentSection, setComments] = useState([])

    const createComment = () => {
        const userId = user.id 
        axios.post(`/api/comment/${pollId}`, {userId, pollId, comment})
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }

    const getComment = () => {
        axios.get(`/api/comments/${pollId}`)
        .then(res => {
            setComments(res.data)
        })
        .catch(err => console.log(err))
    }

    const mappedComments = commentSection.map(comments => {
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
                onChange={e => setComments(e.target.value)}
                />
                <button className='comment-button' onClick={() => createComment()}>Add Comment</button>
            </div>
            <div className='allComments'>
                {commentSection}
            </div>
        </section>
    )
}

export default Comments