import React, {userState, useEffect, useState} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {updateUser} from '../../redux/reducer'
import axios from 'axios'
import Cookies from 'js-cookie'
//Styling Imports
import './Header.scss'
import logo from '../../img/logo.png'
import Button from '@material-ui/core/Button';
import 'fontsource-roboto'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const Header = (props) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [dropDown, setDropDown] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    const handleSignOut = () => {
        axios.get(`/api/logout`)
            .then( res => {
                dispatch(updateUser(res.data))
                props.history.push('/')
            })
            .catch(err => console.log(err))
        setDropDown(!dropDown)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
      const handleClose = () => {
        setAnchorEl(null);
    }
    const redirectToDash = () => {
        props.history.push('/')
    }

    return (
        <div className='header'>
            <Link to='/' className='drop-down-link'>
                <img src={logo} alt='logo image' className='logo'/>
            </Link>
            <nav>
                {!user.id
                 ? <Link to='/login' className='nav-links'>Sign In</Link>
                 
                 : <>
                        <div className='profile-flex-box'> 
                            {/* add conditonal statement for if user has profile pic */}
                            <img src={user.profile_picture} alt='user profile pic' className='profile-pic' onClick={handleClick}/>
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                {user.username}
                            </Button>
                        </div>
                    </>
                }
                <div>
                <Menu
                    className='simple-menu'
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <section className='drop-down-menu'>
                        <div className='menu-profile-flex-box'> 
                            <img src={user.profile_picture} alt='user profile pic' className='menu-profile-pic'/>
                            <h4 className='username'>{user.username}</h4>
                            <MenuItem onClick={handleClose}><Link to='/' className='drop-down-link'><p>Dashboard</p></Link></MenuItem>
                            <MenuItem onClick={handleClose}><Link to={`/${user.id}/polls`} className='drop-down-links'>Your Polls</Link></MenuItem>
                            <MenuItem onClick={handleClose}><Link to={`/${user.id}/settings`} className='drop-down-links'>Settings</Link></MenuItem>
                            <MenuItem onClick={handleClose}> <Link className='drop-down-links' onClick={handleSignOut}>Sign Out</Link></MenuItem>
                        </div>                     
                    </section>
                </Menu>
                    {dropDown && 
                        <section className='drop-down-menu'>
                            <div className='menu-profile-flex-box'> 
                                <img src={user.profile_picture} alt='user profile pic' className='menu-profile-pic' onClick={() => setDropDown(!dropDown)}/>
                                <h4 onClick={() => setDropDown(!dropDown)} className='username'>{user.username}</h4>
                            </div>
                            <Link to='/' className='drop-down-link'>Dashboard</Link>
                            <Link to={`/${user.id}/polls`} className='drop-down-links'>Your Polls</Link>
                            <Link to={`/${user.id}/settings`} className='drop-down-links'>Settings</Link>
                            <Link className='drop-down-links' onClick={handleSignOut}>Sign Out</Link>                        
                        </section>
                    }
                </div>
            </nav>
        </div>
    )
}

export default Header