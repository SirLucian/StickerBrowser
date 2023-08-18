from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from supabase_py import create_client, Client
import requests
import os

load_dotenv()

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')
REMOVEBG_API_KEY = os.getenv('REMOVEBG_API_KEY')

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = Flask(__name__)
CORS(app)

@app.route('/images', methods=['GET'])
def get_images():
    start = request.args.get('start', default=0, type=int)
    end = request.args.get('end', default=50, type=int)
    response = supabase.table('stickers_view').select('*').range(start, end).execute()
    return jsonify(response['data'])

@app.route('/favorite', methods=['POST'])
def favorite_image():
    image_id = request.json['id']
    response = supabase.table('stickers_view').update({'favorite': True}, ['id']).eq('id', image_id)
    return jsonify(response['data'])

@app.route('/unfavorite', methods=['POST'])
def unfavorite_image():
    image_id = request.json['id']
    response = supabase.table('stickers_view').update({'favorite': False}, ['id']).eq('id', image_id)
    return jsonify(response['data'])

@app.route('/removebg', methods=['POST'])
def remove_background():
    image_url = request.json['url']
    response = requests.post(
        'https://api.remove.bg/v1.0/removebg',
        data={'image_url': image_url},
        headers={'X-Api-Key': REMOVEBG_API_KEY},
    )
    return flask.send_file(
        io.BytesIO(response.content),
        mimetype='image/png',
        as_attachment=True,
        attachment_filename='output.png'
    )

if __name__ == '__main__':
    app.run(debug=True)
