import React, {userState, useEffect, useState} from 'react'
import Header from '../Header/Header'
import {useDispatch, useSelector} from 'react-redux'
//Styling Imports
import './Dashboard.scss'
import axios from 'axios'

const Dashboard = (props) => {
    //redux variables
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    console.log('user:',user)

    return (
        <div className='dashboard'>
            <Header />
            DASHBOARD PAGE
        </div>
    )
}

export default Dashboard