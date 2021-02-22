import React, {userState, useEffect, useState} from 'react'
import Header from '../Header/Header'
import {useDispatch, useSelector} from 'react-redux'
import {updateUser} from '../../redux/reducer'
//Styling Imports
import Button from '@material-ui/core/Button'
import { TextField } from '@material-ui/core'
import 'fontsource-roboto'
import './Settings.scss'
import axios from 'axios'

const Settings = (props) => {
    const [editView, setEditView] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const id = user.id

    const editUsername = () => {
        axios.put(`/api/:id/updateUsername`, {username, id})
            .then(res => {
                dispatch(updateUser(res.data))
                setUsername('')
            })
            .catch(err => console.log(err))
    }

    const editPassword = () => {
        axios.put(`/api/:id/updatePassword`, {password, id})
            .then(res => {
                dispatch(updateUser(res.data))
                setPassword('')
            })
            .catch(err => console.log(err))
    }

    const editEmail = () => {
        axios.put(`/api/:id/updateEmail`, {email, id})
            .then(res => {
                dispatch(updateUser(res.data))
                setEmail('')
            })
            .catch(err => console.log(err)) 
    }

    // console.log(user)

    return (
        <div className='settings'>
            <Header history={props.history} user={user}/>
            {/* <img className='profile-pic' src={user.profile_picture}/> */}
            <h2>Welcome to your profile, {user.username}</h2>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
            <p>Password: ******</p>
            {!editView
             ? (
                <div className='edit-user-container'>
                    <Button className='edit-button' variant='contained' onClick={()=> setEditView(!editView)}>Edit Information</Button>
                </div>
             )
             : ( 
                 <div>
                     <TextField
                        value={username}
                        placeholder='New Username'
                        onChange={e => setUsername(e.target.value)} />
                    <Button variant='contained' onClick={editUsername} id='edit-btn'>Submit</Button>    
                 </div>
             )}
            <input onChange={(e) => setUsername(e.target.value)}></input>
            <button onClick={editUsername}>Edit Username</button>
            <input onChange={(e) => setEmail(e.target.value)}></input>
            <button onClick={editEmail}>Edit Email</button>
            <input onChange={(e) => setPassword(e.target.value)} type='password'></input>
            <button onClick={editPassword}>Edit Password</button>
        </div>
    )
}

export default Settings