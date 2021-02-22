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
import defaultProfilePic from '../../img/default-profile-pic.jpg'

const Settings = (props) => {
    const [editView, setEditView] = useState(false)
    const [username, setUsername] = useState('')
    const [verUsername, setVerUsername] = useState('')
    const [email, setEmail] = useState('')
    const [verEmail, setVerEmail] = useState('')
    const [password, setPassword] = useState('')
    const [verPassword, setVerPassword] = useState('')
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const id = user.id

    const handleSignOut = () => {
        axios.get(`/api/logout`)
            .then( res => {
                dispatch(updateUser(res.data))
                props.history.push('/')
            })
            .catch(err => console.log(err))
    }

    const editUsername = () => {
        if( username && username === verUsername){
            axios.put(`/api/:id/updateUsername`, {username, id})
                .then(res => {
                    dispatch(updateUser(res.data))
                    setUsername('')
                    setVerUsername('')
                })
                .catch(err => console.log(err))
        }else{
            alert('Usernames do not match.')
        }
    }

    const editPassword = () => {
        if( password && password === verPassword){
            axios.put(`/api/:id/updatePassword`, {password, id})
                .then(res => {
                    dispatch(updateUser(res.data))
                    setPassword('')
                    setVerPassword('')
                })
                .catch(err => console.log(err))
        }else{
            alert('Passwords do not match.')
        }
    }

    const editEmail = () => {
        if( email && email === verEmail){
            axios.put(`/api/:id/updateEmail`, {email, id})
                .then(res => {
                    dispatch(updateUser(res.data))
                    setEmail('')
                    setVerEmail('')
                })
                .catch(err => console.log(err)) 
        }else{
            alert('Emails do not match.')
        }
    }

    // console.log(user)

    return (
        <div className='settings'>
            <Header history={props.history} user={user}/>
            <h2 className='welcome-message'>Welcome to your profile settings, {user.username}.</h2>
            <img className='settings-profile-pic' src={user.profile_picture} alt='user profile picture'/>
            <h4>Email: {user.email}</h4>
            <h4>Username: {user.username}</h4>
            
            <div className='edit-flex-box'>
                {!editView
                ? (
                    <div className='edit-user-container'>
                        <Button className='edit-button' variant='contained' onClick={()=> setEditView(!editView)}>Edit Information</Button>
                        <div>
                            <Button className='edit-button' variant='contained' onClick={handleSignOut}>Sign Out</Button> 
                        </div>
                    </div>
                )
                : ( 
                    <div>
                        <section className='edit-container'>
                            <TextField
                                value={username}
                                placeholder='New Username'
                                onChange={e => setUsername(e.target.value)} />
                            <TextField
                                className='verify-input-box'
                                value={verUsername}
                                placeholder='Verify New Username'
                                onChange={e => setVerUsername(e.target.value)} />
                                
                            <Button variant='contained' onClick={editUsername} id='edit-btn' size='small'>Submit</Button>   
                        </section>
                        <section className='edit-container'>
                            <TextField
                                value={email}
                                placeholder='New Email'
                                onChange={e => setEmail(e.target.value)} />
                            <TextField
                                className='verify-input-box'
                                value={verEmail}
                                placeholder='Verify New Email'
                                onChange={e => setVerEmail(e.target.value)} />
                                
                            <Button variant='contained' onClick={editEmail} id='edit-btn' size='small'>Submit</Button>   
                        </section>
                        <section className='edit-container'>
                            <TextField
                                type='password'
                                value={password}
                                placeholder='New Password'
                                onChange={e => setPassword(e.target.value)} />
                            <TextField
                                type='password'
                                className='verify-input-box'
                                value={verPassword}
                                placeholder='Verify New Password'
                                onChange={e => setVerPassword(e.target.value)} />
                                
                            <Button variant='contained' onClick={editPassword} id='edit-btn' size='small'>Submit</Button>   
                        </section>
                        <div>
                            <Button className='cancel-button' variant='contained' onClick={()=> setEditView(!editView)}>Cancel Edit</Button> 
                        </div>
                    </div>
                )}
            </div>
            {/* <input onChange={(e) => setUsername(e.target.value)}></input>
            <button onClick={editUsername}>Edit Username</button>
            <input onChange={(e) => setEmail(e.target.value)}></input>
            <button onClick={editEmail}>Edit Email</button>
            <input onChange={(e) => setPassword(e.target.value)} type='password'></input>
            <button onClick={editPassword}>Edit Password</button> */}
        </div>
    )
}

export default Settings