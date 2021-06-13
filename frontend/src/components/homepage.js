import React, { Component } from "react";
import Room from "./Room";
import CreateMatch from "./CreateMatch";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { DataGrid } from "@material-ui/data-grid";
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
import "@babel/polyfill";

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
      username: "testing",
      password: "testing",
      username_result: "tests",
      result: 0,
      rows: {},
    };
    this.createGuest();
    this.getUser();
    this.clearRoomCode = this.clearRoomCode.bind(this);
    //this.fillTable();
    this.getResults();
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

  fillTable() {
    this.setState({
      rows: this.state.result,
    });
  }

  clearRoomCode() {
    this.setState({
      roomCode: null,
    });
  }

  createGuest() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        //username: this.state.username,
        password: this.state.password,
      }),
    };
    fetch("/api/create-user", requestOptions).then((response) =>
      response.json()
    );
  }

  getUser() {
    fetch("/api/get-user" + "?id=" + 1)
      .then((response) => {
        if (!response.ok) {
          this.props.history.push("/create");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          username: data.username,
        });
      });
  }

  getResults() {
    fetch("/api/get-result" + "?page=" + 1)
      .then((response) => {
        if (!response.ok) {
          console.log("Тут щось не так");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          result: data.result,
          username_r: data.username,
        });
      });
  }

  render() {
    const columns = [
    { field: "id", headerName: "ID", width: 90},
      { field: "result", headerName: "Result", width: 90 },
      { field: "username", headerName: "Username", width: 150 },
    ];
    const rows = [
      { id: 1, result: this.state.result, username: this.state.username_r },
    ];
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
                <Typography variant="h3">{this.state.username}</Typography>
              </Grid>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
        {/* <div className="right">
        <div style={{height: 800, width: '100%'}}>
              <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
            />
            </div>
        </div> */}
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
            <Route
              path="/room/:roomCode"
              render={(props) => {
                return (
                  <Room {...props} leaveButtonPressed={this.clearRoomCode} />
                );
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
