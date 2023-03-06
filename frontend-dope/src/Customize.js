import "./Customize.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import MenuItem from '@mui/material/MenuItem';

let playlistName = "Hello World"
let playlistGenres = 'pop'
let playlistArtist = "Beyonce"

function Customize() {
    const [Danceability, setDanceability] = useState(1);
    const [Accousticness, setAccousticness] = useState(1);
    const [Energy, setEnergy] = useState(1);
    const [Instrumentalness, setInstrumentalness] = useState(1);
    const [Loudness, setLoudness] = useState(1);
    const [Valence, setValence] = useState(1);
    const [Tempo, setTempo] = useState(1);
    const [Name, setName] = useState(playlistName);
    const [Artist, setArtist] = useState(playlistArtist);
    const [Genres, setGenres] = useState([playlistGenres]);
    const [Token, setToken] = useState([]);

    const handleNameInputChange = event => {
        playlistName = event.target.value
    };

    const handleArtistInputChange = event => {
        playlistArtist = event.target.value
    };

    const handleGenreInputChange = event => {
        playlistGenres = event.target.value
    };

    useEffect(() => {
        const USER_PROFILE_ENDPOINT = `https://api.spotify.com/v1/me`;

        let token = window.localStorage.getItem("token");
        console.log(token)

        const getUserInfo = async () => {
            const { data } = await axios.get(USER_PROFILE_ENDPOINT, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(data);
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

    const FetchCustomPlaylist = async () => {
        setName(playlistName)
        setArtist(playlistArtist)
        setGenres(playlistGenres.split(','))
        const GET_PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists/`;

        const data = {
            token: Token,
            playlist_name: Name,
            seed_artists: Artist,
            seed_genres: Genres,
            target_danceability: Danceability,
            target_acousticness: Accousticness,
            target_energy: Energy,
            target_instrumentalness: Instrumentalness,
            target_loudness: Loudness,
            target_valence: Valence,
            target_tempo: Tempo,
        };

        console.log(data)
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
        console.log(returnPlaylist.data);
    };

    const CssTextField = styled(TextField)({
        '& input:valid + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        }
    });

    const genres = [
        { value: 'acoustic', label: 'acoustic' },
        { value: 'afrobeat', label: 'afrobeat' },
        { value: 'alt-rock', label: 'alt-rock' },
        { value: 'alternative', label: 'alternative' },
        { value: 'ambient', label: 'ambient' },
        { value: 'anime', label: 'anime' },
        { value: 'black-metal', label: 'black-metal' },
        { value: 'bluegrass', label: 'bluegrass' },
        { value: 'blues', label: 'blues' },
        { value: 'bossanova', label: 'bossanova' },
        { value: 'brazil', label: 'brazil' },
        { value: 'breakbeat', label: 'breakbeat' },
        { value: 'british', label: 'british' },
        { value: 'cantopop', label: 'cantopop' },
        { value: 'chicago-house', label: 'chicago-house' },
        { value: 'children', label: 'children' },
        { value: 'chill', label: 'chill' },
        { value: 'classical', label: 'classical' },
        { value: 'club', label: 'club' },
        { value: 'comedy', label: 'comedy' },
        { value: 'country', label: 'country' },
        { value: 'dance', label: 'dance' },
        { value: 'dancehall', label: 'dancehall' },
        { value: 'death-metal', label: 'death-metal' },
        { value: 'deep-house', label: 'deep-house' },
        { value: 'detroit-techno', label: 'detroit-techno' },
        { value: 'disco', label: 'disco' },
        { value: 'disney', label: 'disney' },
        { value: 'drum-and-bass', label: 'drum-and-bass' },
        { value: 'dubstep', label: 'dubstep' },
        { value: 'electronic', label: 'electronic' },
        { value: 'emo', label: 'emo' },
        { value: 'folk', label: 'folk' },
        { value: 'french', label: 'french' },
        { value: 'funk', label: 'funk' },
        { value: 'garage', label: 'garage' },
        { value: 'german', label: 'german' },
        { value: 'gospel', label: 'gospel' },
        { value: 'goth', label: 'goth' },
        { value: 'grindcore', label: 'grindcore' },
        { value: 'groove', label: 'groove' },
        { value: 'grunge', label: 'grunge' },
        { value: 'guitar', label: 'guitar' },
        { value: 'happy', label: 'happy' },
        { value: 'hard-rock', label: 'hard-rock' },
        { value: 'hardcore', label: 'hardcore' },
        { value: 'hardstyle', label: 'hardstyle' },
        { value: 'heavy-metal', label: 'heavy-metal' },
        { value: 'hip-hop', label: 'hip-hop' },
        { value: 'holidays', label: 'holidays' },
        { value: 'honky-tonk', label: 'honky-tonk' },
        { value: 'house', label: 'house' },
        { value: 'indian', label: 'indian' },
        { value: 'indie', label: 'indie' },
        { value: 'indie-pop', label: 'indie-pop' },
        { value: 'industrial', label: 'industrial' },
        { value: 'iranian', label: 'iranian' },
        { value: 'j-dance', label: 'j-dance' },
        { value: 'j-idol', label: 'j-idol' },
        { value: 'j-pop', label: 'j-pop' },
        { value: 'j-rock', label: 'j-rock' },
        { value: 'jazz', label: 'jazz' },
        { value: 'k-pop', label: 'k-pop' },
        { value: 'latin', label: 'latin' },
        { value: 'malay', label: 'malay' },
        { value: 'mandopop', label: 'mandopop' },
        { value: 'metal', label: 'metal' },
        { value: 'metal-misc', label: 'metal-misc' },
        { value: 'metalcore', label: 'metalcore' },
        { value: 'minimal-techno', label: 'minimal-techno' },
        { value: 'movies', label: 'movies' },
        { value: 'new-age', label: 'new-age' },
        { value: 'new-release', label: 'new-release' },
        { value: 'opera', label: 'opera' },
        { value: 'pagode', label: 'pagode' },
        { value: 'party', label: 'party' },
        { value: 'philippines-opm', label: 'philippines-opm' },
        { value: 'piano', label: 'piano' },
        { value: 'pop', label: 'pop' },
        { value: 'pop-film', label: 'pop-film' },
        { value: 'power-pop', label: 'power-pop' },
        { value: 'progressive-house', label: 'progressive-house' },
        { value: 'psych-rock', label: 'psych-rock' },
        { value: 'punk', label: 'punk' },
        { value: 'punk-rock', label: 'punk-rock' },
        { value: 'r-n-b', label: 'r-n-b' },
        { value: 'rainy-day', label: 'rainy-day' },
        { value: 'reggae', label: 'reggae' },
        { value: 'road-trip', label: 'road-trip' },
        { value: 'rock', label: 'rock' },
        { value: 'romance', label: 'romance' },
        { value: 'sad', label: 'sad' },
        { value: 'salsa', label: 'salsa' },
        { value: 'samba', label: 'samba' },
        { value: 'show-tunes', label: 'show-tunes' },
        { value: 'sleep', label: 'sleep' },
        { value: 'soul', label: 'soul' },
        { value: 'spanish', label: 'spanish' },
        { value: 'study', label: 'study' },
        { value: 'summer', label: 'summer' },
        { value: 'swedish', label: 'swedish' },
        { value: 'synth-pop', label: 'synth-pop' },
        { value: 'tango', label: 'tango' },
        { value: 'techno', label: 'techno' },
        { value: 'turkish', label: 'turkish' },
        { value: 'work-out', label: 'work-out' },
        { value: 'world-music', label: 'world-music' },
    ]

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
                                    placeholder={playlistName}
                                    onChange={handleNameInputChange}
                                    varient="filled"
                                    sx={{ input: { color: 'white' } }}
                                    InputLabelProps={{
                                        style: { color: 'white' },
                                    }}
                                />
                                <CssTextField
                                    required
                                    id="outlined-required"
                                    label="Recommended Artist"
                                    placeholder={playlistArtist}
                                    onChange={handleArtistInputChange}
                                    sx={{ input: { color: 'white' } }}
                                    InputLabelProps={{
                                        style: { color: 'white' },
                                    }}
                                />
                                <CssTextField
                                    required
                                    id="outlined-required"
                                    select
                                    label="Recommended Genre"
                                    placeholder={playlistGenres}
                                    onChange={handleGenreInputChange}
                                    sx={{ input: { color: 'white' } }}
                                    InputLabelProps={{
                                        style: { color: 'white' },
                                    }}
                                >
                                    {genres.map((option) => (
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
                                        valueLabelDisplay="auto"
                                        onChange={(e) => setAccousticness(e.target.value)}
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
                                        valueLabelDisplay="auto"
                                        onChange={(e) => setDanceability(e.target.value)}
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