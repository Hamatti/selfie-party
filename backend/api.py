import flask
import sqlite3
import json
from flask_cors import CORS


app = flask.Flask(__name__, static_url_path='/photo/',
                  static_folder='photos')

CORS(app)


def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


@app.route('/photos')
def get_photos():
    conn = sqlite3.connect('pics.db')
    conn.row_factory = dict_factory

    cur = conn.cursor()
    cur.execute('SELECT * FROM photos limit 30')
    photos = cur.fetchall()
    return json.dumps(photos)


@app.route('/photo/<path:path>')
def static_photo(path):
    return app.send_static_file(path)


if __name__ == "__main__":
    app.run()
