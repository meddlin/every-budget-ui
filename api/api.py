from flask import Flask
from flask_cors import CORS, cross_origin
import os
import psycopg2

app = Flask(__name__)
CORS(app)

###
### API Routes
###

@app.route('/hello', methods=['GET', 'POST'])
@cross_origin()
def welcome():
    return "Hello World"

@app.route('/dbtest/', methods=['GET', 'POST'])
def dbtest():
    conn = psycopg2.connect(
        host="localhost",
        port="5434",
        database="test_db",
        user='postgres',
        password='jailbreak'
    )

    cur = conn.cursor()
    cur.execute('SELECT * FROM test_table')

    # res = cur.fetchone()
    res = cur.fetchall()
    print(res)

    # conn.commit()
    cur.close()
    conn.close()

    return res

@app.route('/budget/create', methods=['POST'])
@cross_origin()
def budget_create():
    return "budget create -- placeholder"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)