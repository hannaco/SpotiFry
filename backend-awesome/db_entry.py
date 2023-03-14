'''
This module provides functions to add and retrieve 
information about users and playlists in a database.

Functions:
- add_user(user_id): Adds a user to the database.
- add_playlist(id, user, name, link, seed_artists="N/A", seed_genres="N/A", danceability="N/A",
                acousticness="N/A", energy="N/A", instrumentalness="N/A", loudness="N/A",
                valence="N/A", tempo="N/A"): Adds a playlist to the database.
- get_playlists_from_user(user_id): Returns a list of playlists created by the given user.
- get_playlist_info(playlist_id): Returns information about the playlist with the given ID.

Database Constants:
- users: A constant that represents the "users" collection in the database.
- playlists: A constant that represents the "playlists" collection in the database.
'''

import db_constants

def add_user(user_id):
    """
    Adds a user to the database.

    Args:
        user_id (str): The ID of the user to add.

    Returns:
        int: -1 if the user is already in the database, None otherwise.
    """
    # user already in database
    if (db_constants.users.find_one({"_id" : user_id})):
        print("User already in database")
        return -1
    db_constants.users.insert_one({"_id": user_id})

def add_playlist(id, user, name, link, seed_artists="N/A", seed_genres="N/A", danceability="N/A", 
    acousticness="N/A", energy="N/A", instrumentalness="N/A", 
    loudness="N/A", valence="N/A", tempo="N/A"):
    """
    Adds a playlist to the database.

    Args:
        id (str): The ID of the playlist to add.
        user (str): The ID of the user that owns the playlist.
        name (str): The name of the playlist.
        link (str): The link to the playlist.
        seed_artists (str, optional): The seed artists for the playlist. Defaults to "N/A".
        seed_genres (str, optional): The seed genres for the playlist. Defaults to "N/A".
        danceability (str, optional): The danceability of the playlist. Defaults to "N/A".
        acousticness (str, optional): The acousticness of the playlist. Defaults to "N/A".
        energy (str, optional): The energy of the playlist. Defaults to "N/A".
        instrumentalness (str, optional): The instrumentalness of the playlist. Defaults to "N/A".
        loudness (str, optional): The loudness of the playlist. Defaults to "N/A".
        valence (str, optional): The valence of the playlist. Defaults to "N/A".
        tempo (str, optional): The tempo of the playlist. Defaults to "N/A".

    Returns:
        int: -1 if the playlist ID or user ID is already in the database, None otherwise.
    """
    if (db_constants.playlists.find_one({"_id": id})):
        print("User already in database")
        return -1
    if (not (db_constants.users.find_one({"_id": user}))):
        print("user does not exist")
        return -1
    if (not seed_artists):
        print("Must have seed artist")
        return -1
    if (not seed_genres):
        print("Must have seed genre")
        return -1
    new_playlist = {"_id": id, "user": user, "name": name, "link": link, "seed_artists": seed_artists,
     "seed_genres": seed_genres, "danceability": danceability, "acousticness": acousticness, 
     "energy": energy, "instrumentalness": instrumentalness, "loudness": loudness, "valence": valence,
     "tempo": tempo}

    db_constants.playlists.insert_one(new_playlist)
