import json
from unittest import TestCase, mock
import unittest
from driver import app

class DefaultPlaylistTestCase(unittest.TestCase):

    def setUp(self):
        app.config['TESTING'] = True
        self.app = app.test_client()

    @mock.patch('driver.spotipy.Spotify')
    @mock.patch('driver.add_user')
    @mock.patch('driver.add_playlist')
    def test_default_playlist(self, mock_add_playlist, mock_add_user, mock_spotify):
        # Define the expected response
        expected_response = {'playlist_id': 'playlist_id'}

        # Define the request data
        data = {'token': 'token'}

        # Set up mock Spotify API calls
        mock_spotify_instance = mock_spotify.return_value
        mock_spotify_instance.me.return_value = {'id': 'user_id'}
        mock_spotify_instance.current_user_top_artists.return_value = {'items': [{'id': 'artist_id'}]}
        mock_spotify_instance.artist_top_tracks.return_value = {'tracks': [{'id': 'track_id'}]}

        # Call the endpoint with the test data
        response = self.app.post('/defaultplaylist', data=json.dumps(data), content_type='application/json')
        # Check that the mock Spotify API calls were made as expected
        mock_spotify.assert_called_once_with(auth='token')
        mock_spotify_instance.me.assert_called_once()
        mock_spotify_instance.current_user_top_artists.assert_called_once_with(limit=5, time_range="short_term")
        mock_spotify_instance.artist_top_tracks.assert_called_once_with('artist_id')

        # Check that the mock database calls were made as expected
        mock_add_user.assert_called_once_with('user_id')

        # Check that the response is as expected
        self.assertEqual(response.status_code, 200)



class TestCustomPlaylist(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
        self.token = 'test_token'
        self.seed_artists = 'Post Malone, Drake'
        self.seed_genres = 'rap'
        self.target_danceability = 0.5
        self.target_acousticness = 0.5
        self.target_energy = 0.5
        self.target_instrumentalness = 0.5
        self.target_loudness = -10
        self.target_valence = 0.5
        self.target_tempo = 120
        self.playlist_name = 'Test Playlist'

    @mock.patch('driver.spotipy.Spotify')
    @mock.patch('driver.add_user')
    @mock.patch('driver.add_playlist')
    def test_custom_playlist(self, mock_add_playlist, mock_add_user, mock_spotify):
        mock_spotify.return_value.me.return_value = {'id': 'test_user_id'}
        mock_spotify.return_value.search.return_value = {'artists': {'items': [{'id': 'test_artist_id'}]}}
        mock_spotify.return_value.recommendations.return_value = {
            'tracks': [{'id': 'test_track_id_1'}, {'id': 'test_track_id_2'}]}
        mock_spotify.return_value.user_playlist_create.return_value = {
            'id': 'test_playlist_id', 'external_urls': {'spotify': 'https://open.spotify.com/playlist/test'}}
        mock_spotify.return_value.playlist_add_items.return_value = {}
        mock_add_user.return_value = None
        mock_add_playlist.return_value = None

        response = self.app.post('/customPlaylist', json={
            'token': self.token,
            'seed_artists': self.seed_artists,
            'seed_genres': self.seed_genres,
            'target_danceability': self.target_danceability,
            'target_acousticness': self.target_acousticness,
            'target_energy': self.target_energy,
            'target_instrumentalness': self.target_instrumentalness,
            'target_loudness': self.target_loudness,
            'target_valence': self.target_valence,
            'target_tempo': self.target_tempo,
            'playlist_name': self.playlist_name
        })

        assert response.status_code == 200
        assert response.data.decode('utf-8') == 'test_playlist_id'
        mock_spotify.assert_called_once_with(auth=self.token)
        mock_spotify.return_value.me.assert_called_once()
        mock_spotify.return_value.search.assert_called_with(q=' Drake', type='artist')
        mock_spotify.return_value.recommendations.assert_called_with(
            seed_artists=['test_artist_id', 'test_artist_id'], seed_genres=['rap'],
            target_danceability=self.target_danceability, target_acousticness=self.target_acousticness,
            target_energy=self.target_energy, target_instrumentalness=self.target_instrumentalness,
            target_loudness=self.target_loudness, target_valence=self.target_valence, target_tempo=self.target_tempo)
        mock_spotify.return_value.user_playlist_create.assert_called_with(
            user='test_user_id', name=self.playlist_name, public=True,
            description='A playlist created with SpotiFry')
        mock_spotify.return_value.playlist_add_items.assert_called_with(
            playlist_id='test_playlist_id', items=['test_track_id_1', 'test_track_id_2'])
