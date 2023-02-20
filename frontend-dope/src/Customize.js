import "./Customize.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from "react";

function Customize() {
    const DiscreteSlider = ({ name }) => {

        const [numParam, setnumParam] = React.useState([]);

        return (
            <div className="slidecontainer">
                <h6> {name} </h6>
                <Slider
                    defaultValue={1}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={10}
                />
            </div>
        );
    }

    return (
        <div className="customize">
            <h4>Only a few steps away from your personalized playlist...</h4>
            <div className="slidecontainer">
                <Box sx={{ width: 300 }}>
                    <DiscreteSlider name="Danceability" />
                    <DiscreteSlider name="Accousticness" />
                    <DiscreteSlider name="Energy" />
                    <DiscreteSlider name="Instrumentalness" />
                    <DiscreteSlider name="Loudness" />
                    <DiscreteSlider name="Valence" />
                    <DiscreteSlider name="Tempo" />
                    <DiscreteSlider name="Musicality" />
                </Box>
            </div>
        </div>

    );
}

export default Customize;