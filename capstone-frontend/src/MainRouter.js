import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Navbar from './components/NavBar';
import Access from './components/Access'

export default function MainRouter(){
    return (
        <div>
        <Router>
            <Navbar/>
            <Switch>
            <Route exact path="/" component={Access} />   
            </Switch>
            </Router>
            </div>
    )
}