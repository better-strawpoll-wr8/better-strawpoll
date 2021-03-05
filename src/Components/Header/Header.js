import React, {userState, useEffect, useState} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {updateUser} from '../../redux/reducer'
import axios from 'axios'
import Cookies from 'js-cookie'
//Styling Imports
import { makeStyles } from '@material-ui/core/styles';
import './Header.scss'
import logo from '../../img/logo.png'
import Button from '@material-ui/core/Button';
import 'fontsource-roboto'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

//Styling for mui-menu
const useStyles = makeStyles((theme) => ({
    menuPaper: {
      backgroundColor: "#8d9db6"
    }
  }));

const Header = (props) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    //Styling Variables
    const [dropDown, setDropDown] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const classes = useStyles();

    //sign out function
    const handleSignOut = () => {
        axios.get(`/api/logout`)
            .then( res => {
                console.log('userdata: ', res.data)
                dispatch(updateUser(res.data))
                props.history.push('/')
            })
            .catch(err => console.log(err))
    }

    //drop down menu toggles
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
      const handleClose = () => {
        setAnchorEl(null);
    }
  
    return (
        <div className='header'>
            <Link to='/' className='drop-down-link'>
                <img src={logo} alt='logo image' className='logo'/>
            </Link>
            <nav>
                {!user.id
                 ? 
                 <div className='header-links'>
                 <Link to='/' className='nav-links'>Dashboard</Link>
                 <Link to='/login' className='nav-links'>Sign In</Link>
                 </div>
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
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    classes={{ paper: classes.menuPaper }}
                >
                    <section className='drop-down-menu'>
                        <div className='menu-profile-flex-box'> 
                            <img src={user.profile_picture} alt='user profile pic' className='menu-profile-pic'/>
                            <h4 className='username'>{user.username}</h4>
                            <MenuItem onClick={handleClose} className='menu-item'><Link to='/' className='drop-down-link'><p>Dashboard</p></Link></MenuItem>
                            <MenuItem onClick={handleClose} className='menu-item'><Link to={`/${user.id}/polls`} className='drop-down-links'>Your Polls</Link></MenuItem>
                            <MenuItem onClick={handleClose} className='menu-item'><Link to={`/${user.id}/settings`} className='drop-down-links'>Settings</Link></MenuItem>
                            <MenuItem onClick={handleClose} className='menu-item'> <Link className='drop-down-links' onClick={handleSignOut}>Sign Out</Link></MenuItem>
                        </div>                     
                    </section>
                </Menu>
                </div>
            </nav>
        </div>
    )
}

export default Header