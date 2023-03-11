import pymongo
from pymongo import MongoClient

cluster = MongoClient("mongodb+srv://spotifry:ZYQSXYmfMpv9rPFD@cluster0.umc8ozc.mongodb.net/?retryWrites=true&w=majority")
db = cluster["spotifry"]
users = db["users"]
playlists = db["playlists"]