"""
This module provides functions to interact with a database 
that stores information about users and their playlists.
The database is defined in the db_constants module, 
and the functions in this module use the pymongo library to perform
database operations such as inserting, deleting, and querying data.

Functions:

add_user(user_id)
add_playlist(id, user, name, link, seed_artists="N/A", seed_genres="N/A", danceability="N/A",
    acousticness="N/A", energy="N/A", instrumentalness="N/A", loudness="N/A", 
    valence="N/A", tempo="N/A")
get_playlists_from_user(user_id)
get_playlist_info(playlist_id)
delete_user(user_id)
delete_playlist(playlist_id)
"""
import db_constants

def delete_user(user_id):
    """
    Deletes the user with the given ID from the database, along with all their playlists.

    Args:
        user_id (int): The ID of the user to delete.

    Returns:
        int: -1 if the user does not exist in the database, None otherwise.
    """
    if not (db_constants.users.find_one({"_id": user_id})):
        print("User does not exist")
        return -1
    db_constants.users.delete_one({"_id": user_id})
    db_constants.playlists.delete_many({"user": user_id})

def delete_playlist(playlist_id):
    """
    Deletes the playlist with the given ID from the database.

    Args:
        playlist_id (int): The ID of the playlist to delete.

    Returns:
        int: -1 if the playlist does not exist in the database, None otherwise.
    """
    if not (db_constants.playlists.find_one({"_id": playlist_id})):
        print("Playlist does not exist")
        return -1
    db_constants.playlists.delete_one({"_id": playlist_id})