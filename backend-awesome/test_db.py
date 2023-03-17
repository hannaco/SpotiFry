import unittest
import pytest
import db_constants
import db_entry
import db_delete
import db_queries

class DatabaseTestCase(unittest.TestCase):

    def setUp(self):
        # delete test entries in case they are already entered (it's okay if this errors)
        db_delete.delete_user("43c387bb15ce46f6")
        db_delete.delete_playlist('test_playlist_id')

    def tearDown(self):
        # delete entries
        db_delete.delete_user("43c387bb15ce46f6")
        db_delete.delete_playlist('test_playlist_id')

    def test_db_entry(self):
        db_entry.add_user("43c387bb15ce46f6")

        db_entry.add_playlist('test_playlist_id', '43c387bb15ce46f6', 
        'test_playlist_name', 'test_playlist_link', 
        'test_playlist_seed_artist', 'test_playlist_seed_genre', 
        'test_playlist_daceability', 'test_playlist_acoustic', 
        'test_playlist_energy', 'test_playlist_instrumental', 
        'test_playlist_loudness', 'test_playlist_valence', 
        'test_playlist_tempo')

    def test_db_delete(self):
        db_entry.add_user("43c387bb15ce46f6")

        db_entry.add_playlist('test_playlist_id', '43c387bb15ce46f6', 
        'test_playlist_name', 'test_playlist_link', 
        'test_playlist_seed_artist', 'test_playlist_seed_genre', 
        'test_playlist_daceability', 'test_playlist_acoustic', 
        'test_playlist_energy', 'test_playlist_instrumental', 
        'test_playlist_loudness', 'test_playlist_valence', 
        'test_playlist_tempo')

        db_delete.delete_user("43c387bb15ce46f6")
        db_delete.delete_playlist('test_playlist_id')

    def test_user_query(self):
        db_entry.add_user("43c387bb15ce46f6")

        db_entry.add_playlist('test_playlist_id', '43c387bb15ce46f6', 
        'test_playlist_name', 'test_playlist_link', 
        'test_playlist_seed_artist', 'test_playlist_seed_genre', 
        'test_playlist_daceability', 'test_playlist_acoustic', 
        'test_playlist_energy', 'test_playlist_instrumental', 
        'test_playlist_loudness', 'test_playlist_valence', 
        'test_playlist_tempo')

        playlists = db_queries.get_playlists_from_user("43c387bb15ce46f6")
        expected = {'_id': 'test_playlist_id', 'user': '43c387bb15ce46f6',
            'name': 'test_playlist_name', 'link': 'test_playlist_link', 
            'seed_artists': 'test_playlist_seed_artist',
            'seed_genres': 'test_playlist_seed_genre', 'danceability': 'test_playlist_daceability',
            'acousticness': 'test_playlist_acoustic',
            'energy': 'test_playlist_energy',
            'instrumentalness': 'test_playlist_instrumental',
            'loudness': 'test_playlist_loudness',
            'valence': 'test_playlist_valence',
            'tempo': 'test_playlist_tempo'
        }
        self.assertEqual(playlists[0], expected)

    def test_playlist_query(self):
        db_entry.add_user("43c387bb15ce46f6")

        db_entry.add_playlist('test_playlist_id', '43c387bb15ce46f6', 
        'test_playlist_name', 'test_playlist_link', 
        'test_playlist_seed_artist', 'test_playlist_seed_genre', 
        'test_playlist_daceability', 'test_playlist_acoustic', 
        'test_playlist_energy', 'test_playlist_instrumental', 
        'test_playlist_loudness', 'test_playlist_valence', 
        'test_playlist_tempo')
        
        playlists = db_queries.get_playlist_info('test_playlist_id')
        expected = {'_id': 'test_playlist_id', 'user': '43c387bb15ce46f6',
            'name': 'test_playlist_name', 'link': 'test_playlist_link', 
            'seed_artists': 'test_playlist_seed_artist',
            'seed_genres': 'test_playlist_seed_genre', 'danceability': 'test_playlist_daceability',
            'acousticness': 'test_playlist_acoustic',
            'energy': 'test_playlist_energy',
            'instrumentalness': 'test_playlist_instrumental',
            'loudness': 'test_playlist_loudness',
            'valence': 'test_playlist_valence',
            'tempo': 'test_playlist_tempo'
        }
        self.assertEqual(playlists, expected)

