import React, {userState, useEffect, useState} from 'react'
import {updateUser} from '../../redux/reducer'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'

//Styling Imports
import './Landing.scss'
import logo from '../../img/logo.png'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import 'fontsource-roboto';


const Landing = (props) => {
    //redux variables
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    //state variables
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [verPassword, setVerPassword] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const [registerView, setRegisterView] = useState(false)
    const [loginView, setLoginView] = useState(false)

    const handleRegister = () => {
        if( password && password === verPassword){
            axios.post('/api/register', {username, email, password, profilePic})
                .then(res => {
                    dispatch(updateUser(res.data))
                    props.history.push('/')
                })
                .catch(err => console.log(err))
        }else{
            alert('Passwords do not match.')
        }
    }
    
    const handleLogin = () => {
        
        axios.post('/api/login', {email, password})
            .then(res => {
                dispatch(updateUser(res.data))
                props.history.push('/')
            })
            .catch(err => console.log('login error: ',err))
    }

    return (
        <div className='landing'>
            <div className='login-container'>
                <img src={logo} alt='logo' className='landing-logo'/>
                <section className='button-container'>
                    {registerView
                    ?<div className='input-box-container'>
                        <TextField 
                            value={username}
                            name='username'
                            label='Username'
                            onChange={e => setUsername(e.target.value)}/>
                        <TextField 
                            value={email}
                            name='email'
                            label='Email'
                            onChange={e => setEmail(e.target.value)}/>
                        <TextField 
                            value={password}
                            name='password'
                            label='Password'
                            type='password'
                            onChange={e => setPassword(e.target.value)}/>
                        <TextField 
                            value={verPassword}
                            name='verPassword'
                            label='Verify Password'
                            type='password'
                            onChange={e => setVerPassword(e.target.value)}/>
                        <TextField
                            value={profilePic}
                            name='profilePicture'
                            label='Profile Picture URL'
                            onChange={e => setProfilePic(e.target.value)} />
                        <Button onClick={handleRegister}>Submit</Button>
                    </div>
                    :<div className='input-box-container'>
                            <TextField 
                                value={email}
                                name='email'
                                label='Email'
                                onChange={e => setEmail(e.target.value)}/>
                            <TextField 
                                value={password}
                                name='password'
                                label='Password'
                                type='password'
                                onChange={e => setPassword(e.target.value)}/>
                    </div>}
                    {!registerView ? <Button onClick={handleLogin}>Login</Button> : <Button onClick={() => setRegisterView(!registerView)}>Login</Button>}
                    
                    {!registerView && <Button onClick={() => setRegisterView(!registerView)}>Register</Button>}
                    
                </section>
            </div>

        </div>
    )
}

export default Landing