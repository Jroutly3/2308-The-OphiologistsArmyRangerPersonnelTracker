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

#When running database, remember to change database password to that of the current user's database
#Make sure input is at most 62 characters including spaces

def json_return_proc(cursor):
    row_headers = [x[0] for x in cursor.description]
    for data in cursor.stored_results():
        result = data.fetchall()
    jsondata = []
    for rv in result:
        jsondata.append(dict(zip(row_headers, rv)))
    result = json.dumps(jsondata, default=str)
    return result

def json_return_select(cursor):
    row_headers = [x[0] for x in cursor.description]
    result = cursor.fetchall()
    jsondata = []
    for rv in result:
        jsondata.append(dict(zip(row_headers, rv)))
    result = json.dumps(jsondata, default=str)
    return result

def search_rangers_name(name):
    cnx = mysql.connector.connect(user='root', password='password',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    cursor.callproc('searchName', [name])
    result = json_return_proc(cursor)
    cursor.close()
    return result

#Make sure input is explicitly 10 digits
def search_rangers_id(id):
    cnx = mysql.connector.connect(user='root', password='password',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    cursor.callproc('searchID', [id])
    result = json_return_proc(cursor)
    cursor.close()
    return result

def search_rangers_multifield(name, id):
    cnx = mysql.connector.connect(user='root', password='password',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    cursor.callproc('searchMultifield', [id, name])
    result = json_return_proc(cursor)
    cursor.close()
    return result


def show_ranger_srps():
    cnx = mysql.connector.connect(user='root', password='password',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    cursor.execute("SELECT * FROM regiment.rangersrps;")
    result = json_return_select(cursor)
    cursor.close()
    return result


def show_ranger_relatives():
    cnx = mysql.connector.connect(user='root', password='password',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    cursor.execute("SELECT * FROM regiment.rangerrelatives;")
    result = json_return_select(cursor)
    cursor.close()
    return result

##sortName, sortID, sortCompany are booleans
def show_rangers(sortName, sortID, sortCompany):
    query = "SELECT * FROM regiment.rangers"
    if sortName | sortID | sortCompany:
        query = query + " order by"
        if sortName:
            query = query + " lname,"
        if sortID:
            query = query + " DODid,"
        if sortCompany:
            query = query + " company,"
        query = query[:-1]
    query = query + ";"
    cnx = mysql.connector.connect(user='root', password='password',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    cursor.execute(query)
    result = json_return_select(cursor)
    cursor.close()
    return result
