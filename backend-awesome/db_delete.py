# not sure if this has a use case, creating so it's available to us
import db_constants

# delete a user and all their owned playlists
def delete_user(user_id):
    if not (db_constants.users.find_one({"_id": user_id})):
        print("User does not exist")
        return -1
    db_constants.users.delete_one({"_id": user_id})
    db_constants.playlists.delete_many({"user": user_id})

def delete_playlist(playlist_id):
    if not (db_constants.playlists.find_one({"_id": playlist_id})):
        print("Playlist does not exist")
        return -1
    db_constants.playlists.delete_one({"_id": playlist_id})