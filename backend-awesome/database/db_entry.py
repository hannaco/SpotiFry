import db_constants

def add_user(user_id):
    # user already in database
    if (db_constants.users.find_one({"_id" : user_id})):
        print("User already in database")
        return -1
    db_constants.users.insert_one({"_id": user_id})

def add_playlist(id, user, name, link, seed_artist, seed_song, seed_genre, liveliness, daceability, loudness, popularity, instrumental, acoustic, energy):
    if (db_constants.playlists.find_one({"_id": id})):
        print("User already in database")
        return -1
    if (not (db_constants.users.find_one({"_id": user}))):
        print("user does not exist")
        return -1
    if (not seed_artist):
        print("Must have seed artist")
        return -1
    if (not seed_song):
        print("Must have seed song")
        return -1
    if (not seed_genre):
        print("Must have seed genre")
        return -1
    new_playlist = {"_id": id, "user": user, "name": name, "link": link, "seed_artist": seed_artist,
    "seed_song": seed_song, "seed_genre": seed_genre, "liveliness": liveliness, "danceability": daceability,
    "loudness": loudness, "popularity": popularity, "instrumental": instrumental, "acoustic": acoustic,
    "energy": energy}
    db_constants.playlists.insert_one(new_playlist)
