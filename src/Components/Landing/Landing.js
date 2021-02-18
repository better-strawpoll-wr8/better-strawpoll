import React, {userState, useEffect, useState} from 'react'

//Styling Imports
import './Landing.scss'
import logo from '../../img/logo.png'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import 'fontsource-roboto';


const Landing = (props) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [verPassword, setVerPassword] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const [registerView, setRegisterView] = useState(false)

    const handleRegister = () => {
        
    }
    
    return (
        <div className='landing'>
            <img src={logo} alt='logo' className='logo'/>
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
                    <Button >Register</Button>
                 </div>
                 :<></>}
                <Button >Login</Button>
                {!registerView && <Button onClick={() => setRegisterView(!registerView)}>Register</Button>}
                
            </section>

        </div>
    )
}

export default Landing