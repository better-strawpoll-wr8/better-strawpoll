import React, {userState, useEffect, useState} from 'react'
import axios from 'axios';
import {Pie} from 'react-chartjs-2';
import {io} from 'socket.io-client';
//Styling Imports
import './Results.scss'

const Results = (props) => {
    const [graphData, setGraphData] = useState({});

    const socket = io("165.232.156.25:7777")

    useEffect(() => {
        axios.get(`/api/poll/${props.pollId}`)
            .then(res => setGraphData(res.data))
    }, [])

    if (!localStorage.getItem('colors')) {
        localStorage.setItem('colors', graphData.options?.optionsListTrim.map(() => '#' + Math.floor(Math.random()*16777215).toString(16)));
    }

    const data = {
        labels: graphData.options?.optionsListTrim.map(el => el.optionName),
        datasets: [
            {
                label: '# of votes',
                data: graphData.options?.optionsListTrim.map(el => el.voteCount),
                backgroundColor: localStorage.getItem('colors').split(','),
                borderColor: localStorage.getItem('colors').split(','),
                borderWidth: 1
            }
        ]
    }

    socket.on('updatedata', (pollId) => {
        console.log('update')
        if (pollId === props.pollId) {
            axios.get(`/api/poll/${props.pollId}`)
            .then(res => setGraphData(res.data))
        }
    })

    return (
        <Pie data={data}/>
    )
}

export default Results