import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Header } from './pages/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

const Routes:React.FC = () => {
    return (
        <Router>
            <Header/>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
            </Switch>
        </Router>
    )
}

export default Routes
