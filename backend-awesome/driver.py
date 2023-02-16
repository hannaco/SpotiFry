from flask import Flask, request
from flask_cors import CORS
import spotipy
import random

import sys
sys.path.append('database')
from db_entry import add_user

# Initializing flask app
app = Flask(__name__)
CORS(app)

@app.route('/defaultplaylist', methods=['POST'])
def default_playlist():
    '''
    generates default playlist for given profile based on top 5 artists
    '''
    # Step 1: User authorization
    data = request.get_json()
    token = data['token']

    sp = spotipy.Spotify(auth=token)
    user_id = sp.me()["id"]

    # add user to database if not already registered
    add_user(user_id)

    # Step 2: Get the user's top artists
    top_artists = sp.current_user_top_artists(limit=5, time_range="short_term")

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

    return(new_playlist['id'])

# Running app
if __name__ == '__main__':
    app.run(host="localhost", port=8000, debug=True)