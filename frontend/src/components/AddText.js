import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import RadioGroup from "@material-ui/core/RadioGroup";

export default class AddText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vocabulary: 1,
      text: "",
    };
    this.handleTextsButtonPressed = this.handleTextsButtonPressed.bind(this);
    this.handleVocabulary = this.handleVocabulary.bind(this);
    this.handleText = this.handleText.bind(this);
  }
  handleVocabulary(e) {
    this.setState({
      vocabulary: e.target.value,
    });
  }
  handleText(e) {
    this.setState({
      text: e.target.value,
    });
  }

  handleTextsButtonPressed() {
    if (this.state.text != "" || this.state.nickname.length == 0) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vocabulary: this.state.vocabulary,
          text: this.state.text,
        }),
      };
      fetch("/api/create-text", requestOptions).then((response) =>
        response.json()
      );
      //.then((data) => this.props.history.push("/room/" + data.code));
    } else {
      console.log("Заповни, мда");
    }
  }

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
        <TextField
              required={true}
              type="number"
              onChange={this.handleVocabulary}
              defaultValue={this.vocabulary}
              inputProps={{
                min: 1,
                style: { textAlign: "center" },
              }}
            />
          <FormHelperText>
            <div align="center">Напиши, скільки кинути на пиво</div>
          </FormHelperText>
          <Grid item xs={12} align="center">
            <TextField
              required={true}
              id="standard-basic"
              label="Нікнейм"
              onChange={this.handleText}
              defaultValue={this.nickname}
            />
          </Grid>
          <Grid item xs={12} align="center">
            <Button
              color="secondary"
              variant="contained"
              onClick={this.handleTextsButtonPressed}
            >
              Додати текст!
            </Button>
          </Grid>
          <Grid item xs={12} align="center">
            <Button color="primary" variant="contained" to="/" component={Link}>
              нє.
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
