import React, {userState, useEffect, useState} from 'react'
import Header from '../Header/Header'
import {useDispatch, useSelector} from 'react-redux'
import {updateUser} from '../../redux/reducer'
//Styling Imports
import './Settings.scss'
import axios from 'axios'

const Settings = (props) => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const id = user.id

    const editUsername = () => {
        axios.put(`/api/user/updateUsername`, {username, id})
            .then(res => {
                console.log(username)
                dispatch(updateUser(res.data))
                setUsername('')
            })
            .catch(err => console.log(err))
    }

    const editPassword = () => {
        axios.put(`/api/user/updatePassword`, {password, id})
            .then(res => {
                dispatch(updateUser(res.data))
                setPassword('')
            })
            .catch(err => console.log(err))
    }

    const editEmail = () => {
        axios.put(`/api/user/updateEmail`, {email, id})
            .then(res => {
                dispatch(updateUser(res.data))
                setEmail('')
            })
            .catch(err => console.log(err)) 
    }


    return (
        <div className='settings'>
            <Header/>
            <p>{user.email}</p>
            <p>{user.username}</p>
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