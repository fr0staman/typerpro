import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
      nickname: "test",
    };
    this.roomCode = this.props.match.params.roomCode;
    this.getRoomDetails();
  }

  getRoomDetails() {
    fetch("/api/get-room" + "?code=" + this.roomCode)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
          nickname: data.nick,
        });
      });
  }
  render() {
    return (
      <div align="center">
        <h3>{this.roomCode}</h3>
        <p>Нікнейм: {this.state.nickname}</p>
        <Button size="large" color="secondary" to="/type" component={Link}>
          {" "}Грати{" "}
        </Button>
      </div>
    );
  }
}
