import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Navbar from './components/NavBar';

export default function MainRouter(){
    return (
        <div>
        <Router>
            <Navbar/>
            </Router>
            </div>
    )
}