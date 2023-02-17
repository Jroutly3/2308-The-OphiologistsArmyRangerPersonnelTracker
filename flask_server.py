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
def search_rangers_name(name):
    cnx = mysql.connector.connect(user='root', password='Fl1ght413612!',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    cursor.callproc('searchName', [name])
    row_headers = [x[0] for x in cursor.description]
    result = json_return(cursor)
    cursor.close()
    return result


def search_rangers_id(id):
    cnx = mysql.connector.connect(user='root', password='Fl1ght413612!',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    cursor.callproc('searchID', id)
    row_headers = [x[0] for x in cursor.description]
    result = json_return(cursor)
    cursor.close()
    return result


def search_rangers_multifield(name, id):
    cnx = mysql.connector.connect(user='root', password='Fl1ght413612!',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    cursor.callproc('searchMultifield', [id, name])
    row_headers = [x[0] for x in cursor.description]
    result = json_return(cursor)
    cursor.close()
    return result


def show_ranger_srps():
    cnx = mysql.connector.connect(user='root', password='Fl1ght413612!',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    cursor.execute("SELECT * FROM regiment.rangersrps;")
    result = json_return(cursor)
    cursor.close()
    return result


def show_ranger_relatives():
    cnx = mysql.connector.connect(user='root', password='Fl1ght413612!',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    cursor.execute("SELECT * FROM regiment.rangerrelatives;")
    result = json_return(cursor)
    cursor.close()
    return result


def show_rangers(sortName, sortID, sortCompany):
    query = "SELECT * FROM regiment.rangers"
    if sortName | sortID | sortCompany:
        query = query + " sort by"
        if sortName:
            query = query + " name,"
        if sortID:
            query = query + " id,"
        if sortCompany:
            query = query + " company,"
        query = query[:-1]
    query = query + ";"
    cnx = mysql.connector.connect(user='root', password='Fl1ght413612!',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    cursor.execute(query)
    result = json_return(cursor)
    cursor.close()
    return result


def json_return(cursor):
    row_headers = [x[0] for x in cursor.description]
    result = cursor.fetchall()
    jsondata = []
    for rv in result:
        jsondata.append(dict(zip(row_headers, rv)))
    result = json.dumps(jsondata, default=str)
    return result
