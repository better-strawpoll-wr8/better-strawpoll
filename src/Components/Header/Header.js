import React, {userState, useEffect, useState} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getUser, clearUser, updateUser} from '../../redux/reducer'
import axios from 'axios'
//Styling Imports
import './Header.scss'
import logo from '../../img/logo.png'
import 'fontsource-roboto'




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
            <img src={logo} alt='logo image' className='logo'/>
            <nav>
                {user.id
                 ? <Link to='/login' className='nav-links'>Sign In</Link>
                 : <>
                        <div className='profile-flex-box'> 
                            <img src={logo} alt='user profile pic' className='profile-pic' onClick={() => setDropDown(!dropDown)}/>
                            <h4 onClick={() => setDropDown(!dropDown)} className='username'>placeholder username{user.username}</h4>
                        </div>
                    </>
                }
                <div>
                    {dropDown && 
                        <section className='drop-down-menu'>
                            <div className='menu-profile-flex-box'> 
                                <img src={logo} alt='user profile pic' className='menu-profile-pic' onClick={() => setDropDown(!dropDown)}/>
                                <h4 onClick={() => setDropDown(!dropDown)} className='username'>placeholder username{user.username}</h4>
                            </div>
                            <Link to='/polls' className='drop-down-links'>Your Polls</Link>
                            <Link to='/:id/settings' className='drop-down-links'>Settings</Link>
                            <Link to='/sign-out' className='drop-down-links'>Sign Out</Link>                                
                        </section>
                    }
                </div>
            </nav>
        </div>
    )
}


export default Header