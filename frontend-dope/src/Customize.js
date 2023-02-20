import "./Customize.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';

function Customize() {
    const DiscreteSlider = ({ name }) => {

        const [numParam, setnumParam] = React.useState([]);

        return (
            <div className="slidecontainer">
                <Slider
                    defaultValue={1}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={10}
                    sx={{ width: 300, color: 'success.main', }}
                />
            </div>
        );
    }

    const CssTextField = styled(TextField)({
        '& input:valid + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        }
    });

    return (
        <div className="customize">
            <h4>Only a few steps away from your personalized playlist...</h4>
            <div className="inputcontainer">
                <Button
                    variant="contained"
                    component="label"
                    color="success"
                    size="small"
                >
                    Upload your playlist cover
                    <input
                        type="file"
                        hidden
                    />
                </Button>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                        border: 1, borderColor: 'green', borderRadius: '10px',
                        display: 'flex', flexDirection: 'column', m: 2,
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <CssTextField
                        required
                        id="outlined-required"
                        label="Playlist Name"
                        defaultValue="Hello World"
                        varient="filled"
                        sx={{ input: { color: 'white' } }}
                        InputLabelProps={{
                            style: { color: 'green' },
                        }}
                    />
                    <CssTextField
                        required
                        id="outlined-required"
                        label="Recommended Artist"
                        defaultValue="Beyonce"
                        sx={{ input: { color: 'white' } }}
                        InputLabelProps={{
                            style: { color: 'green' },
                        }}
                    />
                    <CssTextField
                        required
                        id="outlined-required"
                        label="Recommended Genre"
                        defaultValue="Hip-pop"
                        sx={{ input: { color: 'white' } }}
                        InputLabelProps={{
                            style: { color: 'green' },
                        }}
                    />
                </Box>
            </div>
            <div className="slidecontainer">
                <Box sx={{
                    width: 300, display: 'block', typography: 'body1', m: 2
                }}>
                    Danceability <DiscreteSlider name="Danceability" />
                    Accousticness <DiscreteSlider name="Accousticness" />
                    Energy <DiscreteSlider name="Energy" />
                    Instrumentalness <DiscreteSlider name="Instrumentalness" />
                    Loudness <DiscreteSlider name="Loudness" />
                    Valence <DiscreteSlider name="Valence" />
                    Tempo <DiscreteSlider name="Tempo" />
                    Musicality <DiscreteSlider name="Musicality" />
                </Box>
            </div>
            <Button
                onClick={() => {
                    alert('clicked');
                }}
                variant="contained"
                color="success"
                size="big"
            >
                Generate
            </Button>
        </div>

    );
}

export default Customize;