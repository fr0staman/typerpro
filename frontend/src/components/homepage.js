import React, { Component } from 'react'
import Typerpage from './Typerpage'
import Room from './Room'
import CreateMatch from './CreateMatch'
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import { 
    BrowserRouter as Router, 
    Switch, 
    Route, 
    Link, 
    Redirect }
     from "react-router-dom";

export default class Homepage extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <Router>    
            <AppBar>
            <header className="header">
                <Button color="secondary" to="/create" component={Link}> TYPERPRO </Button>
                    <div className="bar">
                        <Button color="primary" to="/type" component={Link}> HallOfFame </Button>
                    </div>
                    <div className="lgn">
                    <Button color="primary" to="/" component={Link}> Логін </Button>
                    </div>
            </header>
            </AppBar>
            <div className = "center">
            <Switch>
                <Route exact path='/'>
                    <Button color="primary" variant="contained" align="center" to="/create" component={Link}>
                    НЄ
                    </Button>
                    </Route>
                <Route path='/create' component={CreateMatch} />
                <Route path='/type' component={Typerpage} />
                <Route path='/room/:roomCode' component={Room} />
            </Switch>
            </div>
        </Router>
        );
    }
}