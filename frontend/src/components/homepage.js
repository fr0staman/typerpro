import React, { Component } from "react";
import Typerpage from "./Typerpage";
import Room from "./Room";
import CreateMatch from "./CreateMatch";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const theme = createMuiTheme({
  typography: {
    subtitle1: {
      fontSize: 32,
      fontFamily: "Montserrat",
      // fontStyle:'Italic',
      fontWeight: 600,
      lineHeight: 1.167,
      color: "#ff79c6",
    },
  },
});

export default class Homepage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <AppBar style={{ background: "#21252b" }}>
            <Toolbar>
              <Grid justify="space-between" container spacing={24}>
                <Button to="/create" component={Link}>
                  <Typography variant="subtitle1">TYPERPRO</Typography>
                </Button>

                <Button color="secondary" to="/type" component={Link}>
                  {" "}
                  HallOfFame{" "}
                </Button>

                <Button color="secondary" to="/" component={Link}>
                  {" "}
                  Логін{" "}
                </Button>
              </Grid>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
        <div className="center">
          <Switch>
            <Route exact path="/">
              <Button
                color="primary"
                variant="contained"
                align="center"
                to="/create"
                component={Link}
              >
                Далі буде...
              </Button>
            </Route>
            <Route path="/create" component={CreateMatch} />
            <Route path="/type" component={Typerpage} />
            <Route path="/room/:roomCode" component={Room} />
          </Switch>
        </div>
      </Router>
    );
  }
}
