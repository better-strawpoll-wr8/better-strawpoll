import React, {userState, useEffect, useState} from 'react'
import axios from 'axios';
import {Pie} from 'react-chartjs-2';
//Styling Imports
import './Results.scss'
import Dashboard from '../Dashboard/Dashboard';

const Results = (props) => {
    const [graphData, setGraphData] = useState({});

    const colors = graphData.options?.optionsListTrim.map(() => '#' + Math.floor(Math.random()*16777215).toString(16))
    const data = {
        labels: graphData.options?.optionsListTrim.map(el => el.optionName),
        datasets: [
            {
                label: '# of votes',
                data: graphData.options?.optionsListTrim.map(el => el.voteCount),
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1
            }
        ]
    }

    useEffect(() => {
        axios.get(`/api/poll/${props.match.params.poll_id}`)
            .then(res => setGraphData(res.data))
    }, [])

    return (
        
        <Pie data={data}/>
        // <Dashboard/>
    )
}

export default Results