import db_constants

def add_user(user_id):
    # user already in database
    if (db_constants.users.find_one({"_id" : user_id})):
        print("User already in database")
        return -1
    db_constants.users.insert_one({"_id": user_id})

def add_playlist(id, user, name, link, seed_artists="N/A", seed_genres="N/A", danceability="N/A", acousticness="N/A", energy="N/A", instrumentalness="N/A", loudness="N/A", valence="N/A", tempo="N/A"):
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
