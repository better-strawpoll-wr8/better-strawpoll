import React from 'react'
import {Switch, Route} from 'react-router-dom'
//Component Imports
import Dashboard from './Components/Dashboard/Dashboard'
import Landing from './Components/Landing/Landing'
import CreatePoll from './Components/CreatePoll/CreatePoll'
import Poll from './Components/Poll/Poll'
import Results from './Components/Results/Results'
import Settings from './Components/Settings/Settings'
import UsersPolls from './Components/UsersPolls/UsersPolls'

export default (
    <Switch>
        <Route exact path= '/' component={Dashboard} />
        <Route path= '/login' component={Landing} />
        <Route path= '/create-poll' component={CreatePoll} />
        <Route path= '/:id/polls' component={UsersPolls} />
        <Route exact path= '/polls/:poll_id' component={Poll} />
        <Route path= '/polls/:poll_id/results' component={Results} />
        <Route path= '/:id/settings' component={Settings} />
    </Switch>
)