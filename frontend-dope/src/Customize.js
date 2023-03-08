import "./Customize.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { TextField, MenuItem } from '@mui/material';
// import { styled } from '@mui/material/styles';
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { valid_genres } from "./Constants";

function Customize() {

    const [formData, setFormData] = useState({
        Artists: "Lauv",
        Name: "Test",
        Genre: "pop",
        Danceability: 1,
        Accousticness: 1,
        Energy: 1,
        Instrumentalness: 1,
        Loudness: 1,
        Valence: 1,
        Tempo:1,
      });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const [Token, setToken] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let token = window.localStorage.getItem("token");
        // console.log(token)

        if (token === '' || token === null) {
            return;
        }
        // setToken would be taking place after the useEffect finished running
        // thus we need to use token instead of Token in the above code
        setToken(token);
    }, [])

    const FetchCustomPlaylist = async () => {

        const GET_PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists/`;

        const data = {
            token: Token,
            playlist_name: formData.Name,
            seed_artists: formData.Artists,
            seed_genres: formData.Genre,
            target_danceability: formData.Danceability,
            target_acousticness: formData.Accousticness,
            target_energy: formData.Energy,
            target_instrumentalness: formData.Instrumentalness,
            target_loudness: formData.Loudness,
            target_valence: formData.Valence,
            target_tempo: formData.Tempo,
        };
        // console.log(data)
        const response = await fetch('http://localhost:8000/customPlaylist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const playlistID = await response.text();
        // console.log(playlistID);

        const returnPlaylist = await axios.get(GET_PLAYLIST_ENDPOINT + playlistID, {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        });
        // console.log(returnPlaylist.data);
        navigate('/result', {state : returnPlaylist.data});
    };

    // const CssTextField = styled(TextField)({
    //     '& input:valid + fieldset': {
    //         borderColor: 'green',
    //         borderWidth: 2,
    //     }
    // });
    const CssTextField = TextField

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
                                onSubmit={FetchCustomPlaylist}
                            >
                                <CssTextField
                                required
                                name='Name'
                                id="outlined-required"
                                label="Playlist Name"
                                defaultValue={formData.Name}
                                onChange={handleInputChange}
                                varient="filled"
                                sx={{ input: { color: 'white' } }}
                                InputLabelProps={{
                                    style: { color: 'white' },
                                }}
                                />
                                <CssTextField
                                    required
                                    name='Artists'
                                    id="outlined-required"
                                    label="Recommended Artist"
                                    defaultValue={formData.Artists}
                                    onChange={handleInputChange}
                                    sx={{ input: { color: 'white' } }}
                                    InputLabelProps={{
                                        style: { color: 'white' },
                                    }}
                                />
                                <CssTextField
                                    required
                                    name='Genre'
                                    id="outlined-required"
                                    select
                                    value={formData.Genre}
                                    label="Recommended Genre"
                                    onChange={handleInputChange}
                                    InputLabelProps={{
                                        style: { color: 'white' },
                                    }}
                                    sx={{ '& .MuiInputBase-input': { color: 'white', textAlign: 'left' } }}

                                >
                                    {valid_genres.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </CssTextField>
                            </Box>
                            <button className="generate"
                                onClick={FetchCustomPlaylist}
                            >
                                Generate
                            </button>
                        </div>
                        <div className="slidecontainer">
                            <Box sx={{
                                width: 300, display: 'block', typography: 'body1', m: 2
                            }}>
                                Accousticness
                                <div className="Accousticness">
                                    <Slider
                                        defaultValue={1}
                                        name='Accousticness'
                                        valueLabelDisplay="auto"
                                        onChange={handleInputChange}
                                        step={1}
                                        marks
                                        min={1}
                                        max={10}
                                        sx={{ width: 300, color: 'success.main', }}
                                    />
                                </div>
                                Danceability
                                <div className="Danceability">
                                    <Slider
                                        defaultValue={1}
                                        name='Danceability'
                                        valueLabelDisplay="auto"
                                        onChange={handleInputChange}
                                        step={1}
                                        marks
                                        min={1}
                                        max={10}
                                        sx={{ width: 300, color: 'success.main', }}
                                    />
                                </div>
                                Energy
                                <div className="Energy">
                                    <Slider
                                        defaultValue={1}
                                        name='Energy'
                                        valueLabelDisplay="auto"
                                        onChange={handleInputChange}
                                        step={1}
                                        marks
                                        min={1}
                                        max={10}
                                        sx={{ width: 300, color: 'success.main', }}
                                    />
                                </div>
                                Instrumentalness
                                <div className="Instrumentalness">
                                    <Slider
                                        defaultValue={1}
                                        name='Instrumentalness'
                                        valueLabelDisplay="auto"
                                        onChange={handleInputChange}
                                        step={1}
                                        marks
                                        min={1}
                                        max={10}
                                        sx={{ width: 300, color: 'success.main', }}
                                    />
                                </div>
                                Loudness
                                <div className="Loudness">
                                    <Slider
                                        defaultValue={1}
                                        name='Loudness'
                                        valueLabelDisplay="auto"
                                        onChange={handleInputChange}
                                        step={1}
                                        marks
                                        min={1}
                                        max={10}
                                        sx={{ width: 300, color: 'success.main', }}
                                    />
                                </div>
                                Tempo
                                <div className="Tempo">
                                    <Slider
                                        defaultValue={1}
                                        name='Valence'
                                        valueLabelDisplay="auto"
                                        onChange={handleInputChange}
                                        step={1}
                                        marks
                                        min={1}
                                        max={10}
                                        sx={{ width: 300, color: 'success.main', }}
                                    />
                                </div>
                                Valence
                                <div className="Valence">
                                    <Slider
                                        defaultValue={1}
                                        name='Tempo'
                                        valueLabelDisplay="auto"
                                        onChange={handleInputChange}
                                        step={1}
                                        marks
                                        min={1}
                                        max={10}
                                        sx={{ width: 300, color: 'success.main', }}
                                    />
                                </div>
                                {/* Musicality 
                            <div className="Musicality">
                                <Slider
                                    defaultValue={1}
                                    valueLabelDisplay="auto"
                                    onChange={(e) => setMusicality(e.target.value)}
                                    step={1}
                                    marks
                                    min={1}
                                    max={10}
                                    sx={{ width: 300, color: 'success.main', }}
                                />
                            </div> */}
                            </Box>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Customize;