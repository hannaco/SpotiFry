import db_constants, db_entry, db_delete, db_queries

julia = {"_id" : "43c387bb15ce46f6"}
test_playlist = {'_id': 'test_playlist_id', 'user': '43c387bb15ce46f6',
    'name': 'test_playlist_name', 'link': 'test_playlist_link', 
    'seed_artist': 'test_playlist_seed_artist', 'seed_song': 'test_playlist_seed_song',
    'seed_genre': 'test_playlist_seed_genre', 'liveliness': 'test_playlist_liveliness', 
    'danceability': 'test_playlist_daceability', 'loudness': 'test_playlist_loudness', 
    'popularity': 'test_playlist_popularity', 'instrumental': 'test_playlist_instrumental',
    'acoustic': 'test_playlist_acoustic', 'energy': 'test_playlist_energy'}

def test_db_entry():
    db_entry.add_user(julia["_id"])

    db_entry.add_playlist(test_playlist["_id"], test_playlist["user"], test_playlist["name"],
    test_playlist["link"], test_playlist["seed_artist"], test_playlist["seed_song"],
    test_playlist["seed_genre"], test_playlist["liveliness"], test_playlist["danceability"],
    test_playlist["loudness"], test_playlist["popularity"], test_playlist["instrumental"],
    test_playlist["acoustic"], test_playlist["energy"])

def test_db_delete():
    db_delete.delete_user(julia["_id"])
    db_delete.delete_playlist(test_playlist["_id"])

def test_user_query():
    return db_queries.get_playlists_from_user(julia["_id"]) 

def test_playlist_query():
    return db_queries.get_playlist_info(test_playlist["_id"])


# run tests

# delete test entries in case they are already entered (it's okay if this errors)
test_db_delete()

# add entries
test_db_entry()

# query to ensure entries are added
assert(test_user_query() == test_playlist)
assert(test_playlist_query() == test_playlist)

# delete entries
test_db_delete()