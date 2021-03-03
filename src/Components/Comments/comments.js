import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import React, {useEffect, useState} from 'react'
//Styling Imports
import './Comments.scss'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import 'fontsource-roboto';

const Comments = (props) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    console.log('user:', user)
    //const pollId = useSelector(state => state.poll)
    const pollId = props.pollId
    const [comment, setComment] = useState('')
    const [commentUser, setCommentUser] = useState({})
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

    const getCommentInfo = (id) => {
        console.log('in getcommentinfo id is: ',id)
        axios.get(`/api/user/${id}`)
            .then(res => {
                return (
                    <div>
                        {res.data.username}
                    </div>
                        
                    )
            })
            .catch(err => console.log(err))

        // return (
        //     <div>
        //         <img src={commentUser.profile_picture}/>
        //         <h3>{commentUser.username}</h3>
        //     </div>
        // )
    }
    
    const getComments = () => {
        axios.get(`/api/comments/${pollId}`)
        .then(res => {
            setPollComment(res.data)
        })
        .catch(err => console.log(err))
    }
    const mappedComments = pollComment.map((comments, index) => {
        return (
            <div className='comment-container' key={index} >
                {() => getCommentInfo(comments.user_id)}
                <p className='commentText'>{comments.comment}</p>
            </div>
        )
    })
    useEffect(() => {
        getComments()
    }, [])
    return (
        <section className='commentBox'>
            {user.id && <div className='writeComment'>
                <TextField
                className='comment-input'
                name='commentBody'
                label='Leave a comment'
                value={comment}
                onChange={e => setComment(e.target.value)}
                />
                <Button className='comment-button' onClick={() => createComment()}>Add Comment</Button>
            </div>}
            <div className='allComments'>
                {mappedComments}
            </div>
        </section>
    )
}

export default Comments