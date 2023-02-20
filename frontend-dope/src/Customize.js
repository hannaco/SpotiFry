import "./Customize.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { Navigate } from "react-router-dom";

function Customize() {
    const DiscreteSlider = () => {

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
    <> {/* if not logged in (no token) navigate back to login page */}
    {!window.localStorage.getItem("token") ? <Navigate replace to='/' />
        :
        <div className="customize">
            <h4>Only a few steps away from your personalized playlist...</h4>
            <div className="inputcontainer">
                <div>
                    <button className="upload">
                        Upload your playlist cover
                        <input
                            type="file"
                            hidden
                        />
                    </button>
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
                    <button className="generate"
                        onClick={() => {
                            alert('clicked');
                        }}
                    >
                        Generate
                    </button>
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
            </div>
        </div>
    } 
    </>
    );
}

export default Customize;