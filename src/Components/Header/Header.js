import React, {userState, useEffect, useState} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getUser, clearUser, updateUser} from '../../redux/reducer'
import axios from 'axios'
//Styling Imports
import './Header.scss'

const Header = (props) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [dropDown, setDropDown] = useState(false)

    const handleSignOut = () => {
        axios.get()
            .then( res => {
                dispatch(updateUser(res.data))
                props.history.push('/dashboard')
            })
            .catch(err => console.loge(err))
        
    }

    return (
        <div className='header'>
            <nav>
                {user.id && 
                    <Link to='/login' className='nav-links'>Sign In</Link>
                }
                {!user.id && 
                    <>
                        <img src={user.profile_picture} alt='user profile pic'/>
                        <h4 onClick={() => setDropDown(!dropDown)}>placeholder username{user.username}</h4>
                        {dropDown && 
                            <section className='drop-down-menu'>
                                <Link to='/polls' className='drop-down-links'>Your Polls</Link>
                                <Link to='/:id/settings' className='drop-down-links'>Settings</Link>
                                <Link to='/sign-out' className='drop-down-links'>Sign Out</Link>                                
                            </section>
                        }
                    </>
                }
            </nav>
        </div>
    )
}


export default Header