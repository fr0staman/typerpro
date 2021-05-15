import React, { Component } from 'react'
import Typerpage from './Typerpage'
import CreateMatch from './CreateMatch'
import Button from '@material-ui/core/Button';
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
            <Switch>
                <Route exact path='/'>
                    <Button color="primary" variant="contained" align="center" to="/create" component={Link}>
                    НЄ
                    </Button></Route>
                <Route path='/create' component={CreateMatch} />
                <Route path='/type' component={Typerpage} />
            </Switch>
        </Router>
        );
    }
}