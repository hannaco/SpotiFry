import db_constants

def get_playlists_from_user(user_id):
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
    info = db_constants.playlists.find_one({"_id":playlist_id})
    if not (info):
        print("no playlist found")
        return -1
    return info

