import os
import uuid

from flask import Flask, request, send_file
from flask_cors import CORS
from waitress import serve

from utils import create_folder, create_zip, create_image

APPLICATION_ZIP_MIMETYPE = 'application/zip'

app = Flask(__name__)
cors = CORS(app)


@app.route('/generate', methods=['POST'])
def generate():
    request_id = str(uuid.uuid4())
    create_folder(request_id)
    barcode_text = request.headers['text']
    create_image(request_id, barcode_text)
    create_zip(request_id)
    file_path = f'{os.getcwd()}/{request_id}.zip'
    return send_file(file_path, mimetype=APPLICATION_ZIP_MIMETYPE)


@app.route('/generate_list', methods=['POST'])
def generate_list():
    request_id = str(uuid.uuid4())
    create_folder(request_id)
    barcode_texts = request.headers['list'].split(',')
    for barcode_text in barcode_texts:
        create_image(request_id, barcode_text)
    create_zip(request_id)
    file_path = f'{os.getcwd()}/{request_id}.zip'
    return send_file(file_path, mimetype=APPLICATION_ZIP_MIMETYPE)


@app.route('/generate_range', methods=['POST'])
def generate_range():
    request_id = str(uuid.uuid4())
    create_folder(request_id)
    prefix = request.headers['prefix']
    start = int(request.headers['start'])
    end = int(request.headers['end'])
    for i in range(start, end):
        barcode_text = prefix + str(i)
        create_image(request_id, barcode_text)
    create_zip(request_id)
    file_path = f'{os.getcwd()}/{request_id}.zip'
    return send_file(file_path, mimetype=APPLICATION_ZIP_MIMETYPE)


if __name__ == '__main__':
    print('code128generator ready!')
    serve(app,
          host='0.0.0.0',
          port=8080)
