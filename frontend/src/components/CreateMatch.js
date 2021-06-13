import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import RadioGroup from "@material-ui/core/RadioGroup";

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

    // return (
    //   // <Grid container spacing={1}>
    //   //   {console.log(this.state.currentData)}
    //   //   <Grid item xs={12} align="center">
    //   //     <FormControl component="fieldset">
    //   //       <RadioGroup
    //   //         row
    //   //         defaultValue="true"
    //   //         onChange={this.handleGuestCanPauseChange}
    //   //       >
    //   //         {/* <FormControlLabel
    //   //                   value="true"
    //   //                   control={<Radio color = 'primary'/>}
    //   //                   label="Ідьом?"
    //   //                   labelPlacement="bottom"
    //   //                   />
    //   //                   <FormControlLabel value = "true"
    //   //                   value="false"
    //   //                   control={<Radio color = 'secondary'/>}
    //   //                   label="Завалити"
    //   //                   labelPlacement="bottom"
    //   //                   /> */}
    //   //       </RadioGroup>
    //   //     </FormControl>
    //   //   </Grid>
    //   //   <Grid item xs={12} align="center">
    //   //     <FormControl>
    //   //       <TextField
    //   //         required={true}
    //   //         type="number"
    //   //         onChange={this.handleVotesChange}
    //   //         defaultValue={this.defaultVotes}
    //   //         inputProps={{
    //   //           min: 1,
    //   //           style: { textAlign: "center" },
    //   //         }}
    //   //       />
    //   //       <FormHelperText>
    //   //         <div align="center">Напиши, скільки кинути на пиво</div>
    //   //       </FormHelperText>
    //   //     </FormControl>
    //   //   </Grid>
    //   //   <Grid item xs={12} align="center">
    //   //     <TextField
    //   //       required={true}
    //   //       id="standard-basic"
    //   //       label="Нікнейм"
    //   //       onChange={this.handleNicknameChange}
    //   //       defaultValue={this.nickname}
    //   //     />
    //   //   </Grid>
    //   //   <Grid item xs={12} align="center">
    //   //     <Button
    //   //       color="secondary"
    //   //       variant="contained"
    //   //       onClick={this.handleTyperButtonPressed}
    //   //     >
    //   //       Піти друкувати
    //   //     </Button>
    //   //   </Grid>
    //   //   <Grid item xs={12} align="center">
    //   //     <Button color="primary" variant="contained" to="/" component={Link}>
    //   //       нє.
    //   //     </Button>
    //   //   </Grid>
    //   // </Grid>
    // );
  }
}
