"""
This module provides functions for interacting with playlists stored in a database.

The module uses db_constants, a module that defines constants and functions for accessing the database.

Functions:
- get_playlists_from_user(user_id): Returns a list of playlists created by the given user.
- get_playlist_info(playlist_id): Returns information about the playlist with the given ID.
"""
import db_constants

def get_playlists_from_user(user_id):
    """
    Returns a list of playlists created by the given user.

    Args:
        user_id (int): The ID of the user whose playlists to retrieve.

    Returns:
        list: A list of playlists created by the given user. Returns -1 if the user does not exist or has no playlists.
    """
    if not (db_constants.users.find_one({"_id": user_id})):
        print("user does not exist")
        return -1
    if not (db_constants.playlists.find({"user":user_id})):
        print("No playlists are owned by this user.")
        return -1

    created_playlists = db_constants.playlists.find({"user":user_id})
    res = []
    for p in created_playlists:
        res.append(p)
    return res

def get_playlist_info(playlist_id):
    """
    Returns information about the playlist with the given ID.

    Args:
        playlist_id (int): The ID of the playlist to retrieve information about.

    Returns:
        dict: A dictionary containing information about the playlist with the given ID. Returns -1 if no such playlist exists.
    """
    info = db_constants.playlists.find_one({"_id":playlist_id})
    if not (info):
        print("no playlist found")
        return -1
    return info

