from flask import Flask, jsonify
from flask_mysqldb import MySQL
import json
import mysql.connector
import re
import os
import shutil
import fitz
import hashlib

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
def search_rangers_id(dodid):
    cnx = mysql.connector.connect(user='root', password='password',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    cursor.callproc('searchID', [dodid])
    result = json_return_proc(cursor)
    cursor.close()
    return result


def search_rangers_multifield(name, dodid):
    cnx = mysql.connector.connect(user='root', password='password',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    cursor.callproc('searchMultifield', [dodid, name])
    result = json_return_proc(cursor)
    cursor.close()
    return result


def show_ranger_srps():
    cnx = mysql.connector.connect(user='root', password='Fl1ght413612!',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    # cursor = get_cursor()
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
            ssnregex = r'^\d{3}-\d{2}-\d{4}$'
            if not re.match(ssnregex, data):
                return "Data not in XXX-XX-XXXX format"
        case "dodID":
            if (data.isnumeric() == False):
                return "Data enter should be only numbers"
            elif (len(data) != 10):
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
        case "livingstatus":
            if not isinstance(data, bool):
                return "Data not a True/False value"
        case "birthdate":
            dateregex = r'^\d{4}-\d{2}-\d{2}$'
            if not re.match(dateregex, data):
                return "Data is not in XXXX-XX-XX format"
    cnx = mysql.connector.connect(user='root', password='Fl1ght413612!',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    if ((field == "dodID") | (field == "ssn") | (field == "livingstatus")):
        cursor.execute("Update regiment.rangers set " + field + " = " + data + " where dodID = " + dodID + ";")
    else:
        cursor.execute("Update regiment.rangers set " + field + " = \"" + data + "\" where dodID = " + dodID + ";")
    cnx.commit()
    cnx.close()
    cursor.close()


def delete_ranger(ssn):
    cnx = mysql.connector.connect(user='root', password='Fl1ght413612!',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    cursor.execute("Delete from regiment.rangers where ssn = \"" + ssn + "\";")
    cnx.commit()
    cnx.close()
    cursor.close()


def modify_relatives(rangerID, ssn, field, data):
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
            ssnregex = r'^\d{3}-\d{2}-\d{4}$'
            if not re.match(ssnregex, data):
                return "Data not in XXX-XX-XXXX format"
        case "rangerID":
            if (data.isnumeric() == False):
                return "Data entered should be only numbers"
            elif (len(data) != 10):
                return "ID entered is not correct length"
        case "address":
            if (data.isalpha() == False):
                return "Data entered should be only letters"
            elif (len(data) > 40):
                return "Address entered is too long"
        case "relationship":
            if (data.isalpha() == False):
                return "Data entered should be only letters"
            elif (len(data) > 20):
                return "Relationship entered is too long"
        case "birthdate":
            dateregex = r'^\d{4}-\d{2}-\d{2}$'
            if not re.match(dateregex, data):
                return "Data is not in XXXX-XX-XX format"
    cnx = mysql.connector.connect(user='root', password='Fl1ght413612!',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    if (field == "rangerID"):
        cursor.execute(
            "Update regiment.relatives set " + field + " = " + data + " where rangerID = " + rangerID + " and ssn = \"" + ssn + "\";")
    else:
        cursor.execute(
            "Update regiment.relatives set " + field + " = \"" + data + "\" where rangerID = " + rangerID + " and ssn = \"" + ssn + "\";")
    cnx.commit()
    cnx.close()
    cursor.close()


def delete_relatives(rangerID, ssn):
    cnx = mysql.connector.connect(user='root', password='Fl1ght413612!',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    cursor.execute("Delete from regiment.relatives rangerID = " + rangerID + " and ssn = \"" + ssn + "\";")
    cnx.commit()
    cnx.close()
    cursor.close()


# This currently modifies entries in the srp_file table, not that actual srp pdf
def modify_srp_files(srpID, filename, field, data):
    match field:
        case "filename":
            if (len(data) > 30):
                return "Name entered is too long"
        case "file_location":
            if (len(data) > 100):
                return "File path entered is too long"
        case "srpID":
            if (data.isnumeric() == False):
                return "Data entered should be only numbers"
            elif (len(data) != 10):
                return "ID entered is too long"
        case "file_date":
            dateregex = r'^\d{4}-\d{2}-\d{2}$'
            if not re.match(dateregex, data):
                return "Data is not in XXXX-XX-XX format"
    cnx = mysql.connector.connect(user='root', password='Fl1ght413612!',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    if (field == "srpID"):
        cursor.execute(
            "Update regiment.srp_files set " + field + " = " + data + " where srpId = " + srpID + " and filename = \"" + filename + "\";")
    else:
        cursor.execute(
            "Update regiment.srp_files set " + field + " = \"" + data + "\" where srpID = " + srpID + " and filename = \"" + filename + "\";")
    cnx.commit()
    cnx.close()
    cursor.close()


# This currently deletes entries in the srp_file table, not that actual srp pdf
def delete_srp_files(srpID, filename):
    cnx = mysql.connector.connect(user='root', password='Fl1ght413612!',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    cursor.execute("Delete from regiment.srp_files srpID = " + srpID + " and filename = \"" + filename + "\";")
    cnx.commit()
    cnx.close()
    cursor.close()


# This will need to be modified when security features are implented
def modify_accounts(ID, field, data):
    match field:
        case "rangerpassword":
            if (len(data) > 30):
                return "Password entered is too long"
        case "isAdmin":
            if not isinstance(data, bool):
                return "Data not a True/False value"
        case "ID":
            if (data.isnumeric() == False):
                return "ID entered should be only numbers"
            elif (len(data) != 10):
                return "ID entered is too long"
    cnx = mysql.connector.connect(user='root', password='Fl1ght413612!',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    if ((field == "ID") | (field == "isAdmin")):
        cursor.execute("Update regiment.accounts set " + field + " = " + data + " where ID = " + ID + ";")
    else:
        cursor.execute("Update regiment.accounts set " + field + " = \"" + data + "\" where ID = " + ID + ";")
    cnx.commit()
    cnx.close()
    cursor.close()


# This will need to be modified when security features are implented
def delete_accounts(ID):
    cnx = mysql.connector.connect(user='root', password='Fl1ght413612!',
                                  host='127.0.0.1',
                                  database='regiment', port=3306)
    cursor = cnx.cursor()
    cursor.execute("Delete from regiment.accounts ID = " + ID + ";")
    cnx.commit()
    cnx.close()
    cursor.close()

# method to move file, given source and destination filepath as strings
def move_file(filepath, destination):
    if os.path.exists(filepath):
        extension = os.path.splitext(filepath)[-1].lower()
        print(extension)
        if extension == ".pdf":
            try:
                shutil.move(filepath, destination)
            except:
                return "Destination filepath invalid"
        else:
            return "Source file is not a pdf"
    else:
        return "Invalid source filepath or file does not exist"

# given pdf filepath as string, delete source file
def delete_source_file(filepath):
    if os.path.exists(filepath):
        extension = os.path.splitext(filepath)[-1].lower()
        if extension == ".pdf":
            # additional security measures possible here
            os.remove(filepath)
        else:
            return "File is not a pdf"
    else:
        return "Invalid filepath or file does not exist"
        
        
def insert_one_pdf_page_safe(srcfilepath, dstfilepath, target_index):
    source_pdf = fitz.open(srcfilepath)
    target_pdf = fitz.open(dstfilepath)
    target_pdf.delete_page(target_index)
    target_pdf.insert_pdf(source_pdf, from_page=0, to_page=0, start_at=target_index)
    target_pdf.saveIncr()
    target_pdf.close()

def insert_pdf_pages_safe(srcfilepath, dstfilepath, target_index):
    source_pdf = fitz.open(srcfilepath)
    target_pdf = fitz.open(dstfilepath)
    try:
        target_pdf.delete_pages(target_index, target_index + len(source_pdf) - 1)
    except ValueError:
        return "Invalid size or index"
    target_pdf.insert_pdf(source_pdf, from_page=-1, to_page=-1, start_at=target_index)
    source_pdf.close()
    target_pdf.saveIncr()
    target_pdf.close()


def insert_pdf_pages(srcfilepath, dstfilepath, target_index):
    source_pdf = fitz.open(srcfilepath)
    target_pdf = fitz.open(dstfilepath)
    try:
        target_pdf.delete_pages(target_index, target_index + len(source_pdf) - 1)
    except ValueError:
        return "Invalid size or index"
    target_pdf.insert_pdf(source_pdf, from_page=-1, to_page=-1, start_at=target_index)
    source_pdf.close()
    delete_source_file(srcfilepath)
    target_pdf.saveIncr()
    target_pdf.close()
    
    
def init_hash_password(password):
    salt = os.urandom(16)
    hash_value = hashlib.sha256(salt + password.encode('utf-8')).hexdigest()
    return (hash_value, salt)

def hash_password(password, salt):
    hash_value = hashlib.sha256(salt + password.encode('utf-8')).hexdigest()
    return (hash_value)

