import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

export default class CreateMatch extends Component {
  defaultVotes = 2;
  constructor(props) {
    super(props);
    this.state = {
      currentData: [],
      guestCanPause: true,
      nickname: "test",
    };
    this.ws = new WebSocket("ws://localhost:8888/");
    this.handleTyperButtonPressed = this.handleTyperButtonPressed.bind(this);
    this.handleVotesChange = this.handleVotesChange.bind(this);
    this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
    this.handleNicknameChange = this.handleNicknameChange.bind(this);
    this.getUser()
  }
  handleVotesChange(e) {
    this.setState({
      votesToSkip: e.target.value,
    });
  }
  handleNicknameChange(e) {
    this.setState({
      nickname: e.target.value,
    });
  }
  handleGuestCanPauseChange(e) {
    this.setState({
      guestCanPause: e.target.value === "true" ? true : false,
    });
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
          nickname: data.username,
        });
        this.handleTyperButtonPressed()
      });
  }

  handleTyperButtonPressed() {
    if (this.state.nickname != "test" || this.state.nickname.length == 0) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nick: this.state.nickname,
          guest_can_pause: this.state.guestCanPause
        }),
      };
      fetch("/api/create-room", requestOptions)
        .then((response) => response.json())
        .then((data) => this.props.history.push("/room/" + data.code));
    } else {
      console.log("Заповни, мда");
    }
  }

  render() {
    this.ws.onopen = () => {
      console.log("Відкритий конект!");
    };

    this.ws.onmessage = (event) => {
      this.setState({ currentData: JSON.parse(event.data) });
    };

    this.ws.onclose = () => {
      console.log("Закрили, суки");
    };

    const columns = [
      { Header: "Name", accessor: "name" },
      { Header: "Number", accessor: "number" },
    ];

    return (
      <Grid container spacing={1}>
      </Grid>
    );
  }
}
