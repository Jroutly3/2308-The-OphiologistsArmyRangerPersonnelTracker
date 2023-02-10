from flask import Flask, jsonify
from flask_mysqldb import MySQL
import json
import mysql.connector

# app = Flask(__name__)

# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = 'Fl1ght413612!'
# app.config['MYSQL_DB'] = 'regiment'

# mysql = MySQL(app)
# cursor = mysql.connection.cursor()
cnx = mysql.connector.connect(user='root', password='Fl1ght413612!',
                              host='127.0.0.1',
                              database='regiment', port=3306)
cursor = cnx.cursor()
cursor.execute("SELECT * FROM rangers;")
row_headers = [x[0] for x in cursor.description]
result = cursor.fetchall()
jsondata = []
for rv in result:
    jsondata.append(dict(zip(row_headers, rv)))
result = json.dumps(jsondata, default=str)
print(result)
cursor.close()
