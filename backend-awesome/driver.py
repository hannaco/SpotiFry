"""
This module provides a Flask web application that generates custom 
or default playlists for a given user's Spotify account.

It uses the Spotipy library to authorize and interact with the user's Spotify account, 
and Flask to handle HTTP requests.

Endpoints:
- /: serves the main page of the web app.
- /defaultplaylist: generates a default playlist for a given profile based on their top 5 artists.
- /customPlaylist: generates a custom playlist for a given profile based on the given parameters.
- /getplaylists: gets a user's recently created playlists stored in the database.

Dependencies:
- random
- sys
- os
- spotipy
- flask
- flask_cors
- db_entry
- db_queries
"""
import random
import sys
import os
import spotipy
from flask import Flask, request, jsonify
from flask_cors import CORS

sys.path.append('/app/backend-awesome/')

from db_entry import add_user, add_playlist
from db_queries import get_playlists_from_user

# Initializing flask app
app = Flask(__name__, static_folder='../build', static_url_path='/')

# Enabling Cross-Origin Resource Sharing (CORS) to allow requests from other domains
CORS(app)

@app.route('/')
def index():
    '''
    Serves the main page of the web app.
    '''
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    '''
    Serves the main page of the web app when a 404 error occurs.
    '''
    return app.send_static_file('index.html')

@app.route('/defaultplaylist', methods=['POST'])
def default_playlist():
    '''
    Generates a default playlist for a given profile based on their top 5 artists.
    '''
    try:
        # Step 1: User authorization
        data = request.get_json()
        token = data['token']
        sp = spotipy.Spotify(auth=token)
        user_id = sp.me()["id"]

        # add user to database if not already registered
        add_user(user_id)

        # Step 2: Get the user's top artists
        top_artists = sp.current_user_top_artists(limit=5, time_range="short_term")
        if top_artists['items'] == []: # if user doesn't have any top artists in short term
            top_artists = sp.current_user_top_artists(limit=5, time_range="long_term")
        # Step 3: Create a new playlist for the user
        playlist_name = "My Top Artists Playlist (Created by SpotiFry)"
        new_playlist = sp.user_playlist_create(user_id, playlist_name)

        # Step 4: Add tracks from the user's top artists to the new playlist
        track_ids = []
        for artist in top_artists["items"]:
            tracks = sp.artist_top_tracks(artist["id"])["tracks"]
            track_ids += [track["id"] for track in tracks]
        random.shuffle(track_ids)
        sp.user_playlist_add_tracks(user_id, new_playlist["id"], track_ids)

        # Add the new playlist to the database
        add_playlist(new_playlist['id'], user_id, playlist_name,
            new_playlist['external_urls']['spotify'])
        
        return new_playlist['id']

    except Exception as exception:
        # Handle the exception and return an error message to the client
        error_message = str(exception)
        return jsonify({'error': error_message}), 500

@app.route('/customPlaylist', methods=['POST'])
def custom_playlist():
    '''
    Generates a custom playlist for a given profile based on the given parameters.
    '''
    try:
        # Step 1: User authorization
        data = request.get_json()
        token = data['token']
        sp = spotipy.Spotify(auth=token)
        user_id = sp.me()["id"]

        # add user to database if not already registered
        add_user(user_id)

        # Step 2: convert seed_artists from strings to IDs:

        artist_ids = []
        for artist_str in data['seed_artists'].split(','):
            results = sp.search(q=artist_str,type='artist')
            cand_id = results['artists']['items'][0]['id']
            if cand_id:
                artist_ids.append(cand_id)

        # Step 3: Create a new playlist for the user
        playlist_name = data['playlist_name']
        playlist_description = "A playlist created with SpotiFry"

        recommendations = sp.recommendations(
            seed_artists=artist_ids,
            seed_genres=[data['seed_genres']],
            target_danceability=data['target_danceability'],
            target_acousticness=data['target_acousticness'],
            target_energy=data['target_energy'],
            target_instrumentalness=data['target_instrumentalness'],
            target_loudness=data['target_loudness'],
            target_valence=data['target_valence'],
            target_tempo=data['target_tempo']
            )

        track_ids = [track['id'] for track in recommendations['tracks']]

        playlist = sp.user_playlist_create(user=user_id,
            name=playlist_name, public=True, description=playlist_description)

        sp.playlist_add_items(playlist_id=playlist['id'], items=track_ids)

        add_playlist(playlist['id'], user_id, playlist_name,
            playlist['external_urls']['spotify'],artist_ids,data['seed_genres'],
            data['target_danceability'],data['target_acousticness'],
            data['target_energy'],data['target_instrumentalness'],
            data['target_loudness'],data['target_valence'],data['target_tempo'])

        return playlist['id']
    except Exception as exception:
        # handle the exception and return an error message to the client
        error_message = str(exception)
        return jsonify({'error': error_message}), 500

@app.route('/getplaylists', methods=['POST'])
def get_playlists():
    '''
    gets a user's recently created playlists stored in the database
    '''
    try:
        # Step 1: User authorization
        data = request.get_json()
        token = data['token']
        sp = spotipy.Spotify(auth=token)
        user_id = sp.me()["id"]

        playlists_data = get_playlists_from_user(user_id)
        
        return jsonify(playlists_data)
    except Exception as exception:
    # handle the exception and return an error message to the client
        error_message = str(exception)
        return jsonify({'error': error_message}), 500


# Running app
if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)