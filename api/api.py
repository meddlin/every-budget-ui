from flask import Flask
import os
import psycopg2

app = Flask(__name__)

###
### API Routes
###

@app.route('/hello/', methods=['GET', 'POST'])
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)