import "./Customize.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

let playlistName = "Hello World"
let playlistGenre = "Hip-pop"
let playlistArtist = "Beyonce"

function Customize() {
    const [Danceability, setDanceability] = useState(1);
    const [Accousticness, setAccousticness] = useState(1);
    const [Energy, setEnergy] = useState(1);
    const [Instrumentalness, setInstrumentalness] = useState(1);
    const [Loudness, setLoudness] = useState(1);
    const [Valence, setValence] = useState(1);
    const [Tempo, setTempo] = useState(1);
    // const [Musicality, setMusicality] = useState(1);
    const [Name, setName] = useState(playlistName);
    const [Artist, setArtist] = useState(playlistArtist);
    const [Genre, setGenre] = useState(playlistGenre);
    const [userProfile, setUserProfile] = useState([[]]);
    const [Token, setToken] = useState([]);

    const handleNameInputChange = event => {
        playlistName = event.target.value
    };

    const handleArtistInputChange = event => {
        playlistArtist = event.target.value
    };

    const handleGenreInputChange = event => {
        playlistGenre = event.target.value
    };

    // const DiscreteSlider = (props) => {

    //     return (
    //         <div className="slidecontainer">
    //             <Slider
    //                 defaultValue={1}
    //                 valueLabelDisplay="auto"
    //                 value={props.val}
    //                 onChange={props.func}
    //                 step={1}
    //                 marks
    //                 min={1}
    //                 max={10}
    //                 sx={{ width: 300, color: 'success.main', }}
    //             />
    //         </div>
    //     );
    // }

    useEffect(() => {
        const USER_PROFILE_ENDPOINT = `https://api.spotify.com/v1/me`;
        
        let token = window.localStorage.getItem("token");
        // console.log(token)

        const getUserInfo = async () => {
            const { data } = await axios.get(USER_PROFILE_ENDPOINT, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(data)
            setUserProfile(data);
        };

        if (token === '' || token === null) {
            return;
        } else {
            getUserInfo();
        }
        // setToken would be taking place after the useEffect finished running
        // thus we need to use token instead of Token in the above code
        setToken(token);
    }, [])

    const CssTextField = styled(TextField)({
        '& input:valid + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        }
    });

    const FetchCustomPlaylist = async () => {
        setName(playlistName)
        setArtist(playlistArtist)
        setGenre(playlistGenre)
        const data = {
            token: Token,
            playlist_name: Name,
            seed_artist_name: Artist,
            seed_genres: Genre,
            target_danceability: Danceability,
            target_acousticness: Accousticness,
            target_energy: Energy,
            target_instrumentalness: Instrumentalness, 
            target_loudness: Loudness,
            target_valence: Valence,
            target_tempo: Tempo,
        };

        console.log(data)
        // const response = await fetch('http://localhost:8000/defaultplaylist', {
        // method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json',
        // },
        // body: JSON.stringify(data),
        // });
        // const playlistID = await response.text();
        // // console.log(playlistID);
        
        // const returnPlaylist = await axios.get(GET_PLAYLIST_ENDPOINT + playlistID, {
        //     headers: {
        //         Authorization: `Bearer ${Token}`,
        //     },
        // });
        // // console.log(returnPlaylist.data);
        // setPlaylist(returnPlaylist.data);
    };

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
                            defaultValue={playlistName}
                            onChange= {handleNameInputChange}
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
                            defaultValue={playlistArtist}
                            onChange= {handleArtistInputChange}
                            sx={{ input: { color: 'white' } }}
                            InputLabelProps={{
                                style: { color: 'green' },
                            }}
                        />
                        <CssTextField
                            required
                            id="outlined-required"
                            label="Recommended Genre"
                            defaultValue={playlistGenre}
                            onChange= {handleGenreInputChange}
                            sx={{ input: { color: 'white' } }}
                            InputLabelProps={{
                                style: { color: 'green' },
                            }}
                        />
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
                        Danceability 
                            <div className="Danceability">
                                <Slider
                                    defaultValue={1}
                                    valueLabelDisplay="auto"
                                    onChange={(e) => setDanceability(e.target.value)}
                                    step={1}
                                    marks
                                    min={1}
                                    max={10}
                                    sx={{ width: 300, color: 'success.main', }}
                                />
                            </div>
                        Accousticness 
                            <div className="Accousticness">
                                <Slider
                                    defaultValue={1}
                                    valueLabelDisplay="auto"
                                    onChange={(e) => setAccousticness(e.target.value)}
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
                                    valueLabelDisplay="auto"
                                    onChange={(e) => setEnergy(e.target.value)}
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
                                    valueLabelDisplay="auto"
                                    onChange={(e) => setInstrumentalness(e.target.value)}
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
                                    valueLabelDisplay="auto"
                                    onChange={(e) => setLoudness(e.target.value)}
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
                                    valueLabelDisplay="auto"
                                    onChange={(e) => setValence(e.target.value)}
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
                                    valueLabelDisplay="auto"
                                    onChange={(e) => setTempo(e.target.value)}
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