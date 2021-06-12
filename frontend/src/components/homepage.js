import React, { Component } from "react";
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
import AddText from "./AddText";
import "@babel/polyfill"

const theme = createMuiTheme({
  typography: {
    subtitle1: {
      fontSize: 32,
      fontFamily: "Montserrat",

      fontWeight: 600,
      lineHeight: 1.167,
      color: "#ff79c6",
    },
    h3: {
      fontSize: 32,
      fontFamily: "Montserrat",

      fontWeight: 400,
      lineHeight: 1.5,
      color: "#ff79c6",
    },
  },
});

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: null,
    }
    this.componentDidMount()
  }

  async componentDidMount() {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          roomCode: data.code,
        });
      });
  }

  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <AppBar style={{ background: "#21252b" }}>
            <Toolbar>
              <Grid justify="space-between" container spacing={24}>
                <Button to="/" component={Link}>
                  <Typography variant="subtitle1">TYPERPRO</Typography>
                </Button>
                <span></span>
                <span></span>
                <Button color="secondary" to="/text" component={Link}>
                  {" "}
                  Закинути свій текст{" "}
                </Button>
                <Button color="secondary" to="/create" component={Link}>
                  {" "}
                  Логін{" "}
                </Button>
                <Typography variant="h3">fr0staman</Typography>
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
                Створити заїзд
              </Button>
            </Route>
            <Route path="/text" component={AddText} />
            <Route path="/create" component={CreateMatch} />
            {/* <Route path="/type" component={Typerpage} /> */}
            <Route path="/room/:roomCode" component={Room} />
          </Switch>
        </div>
      </Router>
    );
  }
}
