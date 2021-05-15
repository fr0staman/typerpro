import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel"

export default class CreateMatch extends Component{
defaultVotes = 2;
    constructor(props) {
        super(props);
        this.state = {
            questCanPause: true,
            votesToSkip: this.defaultVotes,
        };
    }

handleTyperButtonPressed()
{
    console.log(this.state)
}
    render() {
        return <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component='h4' variant='h4'>
                    Набирати чи не набирати...
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align='center'>
                            Так набирати чи нє?
                        </div>
                    </FormHelperText>
                    <RadioGroup row defaultValue='true'>
                        <FormControlLabel
                        value="true"
                        control={<Radio color = 'primary'/>}
                        label="Ідьом?"
                        labelPlacement="bottom"
                        />
                        <FormControlLabel value = "true"
                        value="false"
                        control={<Radio color = 'red'/>}
                        label="Завалити"
                        labelPlacement="bottom"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField required={true}
                        type="number"
                        defaultValue={this.defaultVotes}
                        inputProps={
                            {
                                min: 1,
                                style: {textAlign: "center"},
                            }
                        }
                        />
                        <FormHelperText>
                            <div align = "center">
                                Напиши, скільки кинути на пиво
                            </div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" onClick={this.handleTyperButtonPressed}>
                    Створити комнатушку
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" to="/" component={Link}>
                    НЄ
                </Button>
            </Grid>
        </Grid>
    }
}