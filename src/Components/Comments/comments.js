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
    const pollId = props.pollId
    const [comment, setComment] = useState('')
    const [commentAuthor, setCommentAuthor] = useState({})
    const [pollComment, setPollComment] = useState([])
    const user_id = user.id 
    const username = user.username
    const profile_picture = user.profile_picture

    const createComment = () => {
        if(comment.length === 0){
            alert('You cannot post an empty comment.')
        }else if(comment.length > 300){
            alert('You have exceeded the maximum of 300 characters.')
        }else{
            axios.post(`/api/comment/${pollId}`, {user_id, username, profile_picture, comment})
            .then(res => {
                setComment('')
                getComments()
            })
            .catch(err => console.log(err))
        }
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
            <div className='comment-container' key={index} onClick={()=> setComment(`@${comments.username} `)}>
                <div className='pic-username-container'>
                    <img src={comments.profile_picture} className='comment-pic'/>
                    <h5 className='comment-username'>{comments.username}</h5>
                    <h5>:</h5>
                </div>
                <p className='commentText'>{comments.comment}</p>
            </div>
        )
    })

    useEffect(() => {
        getComments()
    }, [])
    
    return (
        <section className='commentBox'>
            {user.id && 
                <div className='writeComment'>
                    <TextField
                    className='comment-input'
                    name='commentBody'
                    label='Leave a comment'
                    value={comment}
                    multiline
                    variant="filled"
                    onChange={e => setComment(e.target.value)}
                    />
                    <Button className='comment-button' onClick={() => createComment()}>Add Comment</Button>
                </div>
            }
            <div className='allComments'>
                {mappedComments}
            </div>
        </section>
    )
}

export default Comments