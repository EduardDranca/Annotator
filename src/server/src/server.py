from flask import Flask, request
from urllib import parse
from os import listdir
from os.path import isfile, join
import json
import imghdr
app = Flask(__name__)

@app.route('/get_images/<directory>')
def get_images(directory):
    decodedDir = parse.unquote_plus(directory)
    directoryName = decodedDir.split('\\')[-1]

    files = [join(directory, f) for f in listdir(decodedDir) if isfile(join(directory, f))]
    imgFiles = [f for f in files if imghdr.what(f) != None]

    response = {'images': imgFiles, 'directory': directoryName}
    return json.dumps(response)

if __name__ == '__main__':
    app.run()