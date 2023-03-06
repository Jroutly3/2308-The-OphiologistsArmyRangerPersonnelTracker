from flask import Flask, jsonify
from flask_mysqldb import MySQL
import json
import mysql.connector
import os
import shutil

# app = Flask(__name__)

# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = 'Fl1ght413612!'
# app.config['MYSQL_DB'] = 'regiment'

# mysql = MySQL(app)
# @app.route('/')
# def get_cursor():
#    with app.app_context():
#        return mysql.connection.cursor()


# When running database, remember to change database password to that of the current user's database
# Make sure input is at most 62 characters including spaces

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


# Make sure input is explicitly 10 digits
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
    cnx = mysql.connector.connect(user='root', password='Fl1ght413612!',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    #cursor = get_cursor()
    cursor.execute("SELECT * FROM regiment.rangersrps;")
    result = json_return_select(cursor)
    cursor.close()
    return result


# Testing method
# print(show_ranger_srps())


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


def add_ranger(ip_fname, ip_mname, ip_lname, ip_ssn, ip_dodID, ip_birthdate, ip_address, ip_company, ip_milrank):
    cnx = mysql.connector.connect(user='root', password='Fl1ght413612!',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    cursor.callproc('add_ranger',
                    [ip_fname, ip_mname, ip_lname, ip_ssn, ip_dodID, ip_birthdate, ip_address, ip_company, ip_milrank])
    cnx.commit()
    cnx.close()
    cursor.close()


def add_relative(ip_fname, ip_mname, ip_lname, ip_ssn, ip_rangerID, ip_birthdate, ip_address, ip_relationship):
    cnx = mysql.connector.connect(user='root', password='Fl1ght413612!',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    cursor.callproc('add_relative',
                    [ip_fname, ip_mname, ip_lname, ip_ssn, ip_rangerID, ip_birthdate, ip_address, ip_relationship])
    cnx.commit()
    cursor.close()


def add_srp(ip_filename, ip_file_location, ip_srpID, ip_file_date):
    cnx = mysql.connector.connect(user='root', password='Fl1ght413612!',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    cursor.callproc('add_srp', [ip_filename, ip_file_location, ip_srpID, ip_file_date])
    cnx.commit()
    cursor.close()


def add_account(ip_ID, ip_rangerpassword, ip_IsAdmin):
    cnx = mysql.connector.connect(user='root', password='Fl1ght413612!',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    cursor.callproc('add_account', [ip_ID, ip_rangerpassword, ip_IsAdmin])
    cnx.commit()
    cursor.close()


##Method for pulling unique key for soldiers for dropdowns
def pull_DODIDs():
    cnx = mysql.connector.connect(user='root', password='Fl1ght413612!',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    cursor.execute("Select dodID from regiment.rangers")
    result = cursor.fetchall()
    result = json.dumps(result, default=str)
    cursor.close()
    return result


def modify_ranger(dodID, field, data):
    match field:
        case "fname":
            if (data.isalpha() == False):
                return "Data entered should be only letters"
            elif (len(data) > 20):
                return "Name entered is too long"
        case "mname":
            if (data.isalpha() == False):
                return "Data entered should be only letters"
            elif (len(data) > 20):
                return "Name entered is too long"
        case "lname":
            if (data.isalpha() == False):
                return "Data entered should be only letters"
            elif (len(data) > 20):
                return "Name entered is too long"
        case "ssn":
            if (data.isnumeric() == False):
                return "Data enter should be only numbers"
            elif (len(data) != 10):
                return "SSN entered is not correct length"
        case "dodID":
            if (data.isnumeric() == False):
                return "Data enter should be only numbers"
            elif (len(data) != 11):
                return "ID entered is not correct length"
        case "address":
            if (data.isalpha() == False):
                return "Data entered should be only letters"
            elif (len(data) > 40):
                return "Address entered is too long"
        case "company":
            if (data.isalpha() == False):
                return "Data entered should be only letters"
            elif (len(data) > 40):
                return "Company entered is too long"
    cnx = mysql.connector.connect(user='root', password='Fl1ght413612!',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    if ((field == "dodID") | (field == "ssn") | (field == "livingstatus")):
        cursor.execute("Update regiment.rangers set " + field + " = " + data + " where dodID = " + dodID)
    else:
        cursor.execute("Update regiment.rangers set " + field + " = \"" + data + "\" where dodID = " + dodID)
    cnx.commit()
    cnx.close()
    cursor.close()


def delete_ranger(ssn):
    cnx = mysql.connector.connect(user='root', password='Fl1ght413612!',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    cursor.execute("Delete from regiment.rangers where ssn = " + ssn + ";")
    cnx.commit()
    cnx.close()
    cursor.close()

    # method to move file, given original filepath
    # using placeholder filepaths for now
    def move_file(filepath):
        ## might need to check if filepath is valid
        # used: '/Users/ericsong/Documents/test2/test.txt
        destination = '/Users/ericsong/Documents/test1/test.txt'
        shutil.move(filepath, destination)