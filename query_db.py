import os
import pymysql

host = os.environ.get("DB_HOST", "localhost")
user = os.environ.get("DB_USER", "root")
password = os.environ.get("DB_PASS", "")
db = "rma_ai"

try:
    connection = pymysql.connect(host=host, user=user, password=password, database="release4_rma")
    with connection.cursor() as cursor:
        cursor.execute("SELECT DISTINCT no_of_char FROM newspaper_master;")
        rows = cursor.fetchall()
        for row in rows:
            print(row)
finally:
    connection.close()
