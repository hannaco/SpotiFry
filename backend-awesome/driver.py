import json
from flask import Flask
from flask_cors import CORS
import spotipy


# Initializing flask app
app = Flask(__name__)
CORS(app) 

@app.route('/defaultplaylist')
def gen_playlist():
    '''
    generates default playlist for given profile based on top 5 artists
    '''
    # Returning an api for showing in  reactjs
    data = {
        'message': 'hello world!'
    }
    json_data = json.dumps(data)
    return json_data
      
# Running app
if __name__ == '__main__':
    app.run(debug=True)