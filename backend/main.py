import json
import os
import time

from flask import Flask
from flask_cors import CORS

from database_service import DatabaseService

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
CORS(app)

database_service = None


def create_instances():
    global database_service

    with open("./appsettings.json") as configuration_file:
        configuration = json.load(configuration_file)
        database_configuration = configuration['database_configuration']

    database_service = DatabaseService(database_configuration)

    print("Created all instances")


def kill_process(pid):
    os.system("clear")
    print(f"Killing process with pid: {pid} requested\n")
    os.system(f"kill -9 {pid}")


def check_for_flask_process():
    process_list = os.popen('lsof -i :5000').readlines()
    if process_list:
        flask_process = process_list[1]
        return int((flask_process[flask_process.index(' '):])[:flask_process.index(' ')])
    else:
        return -1


def start_flask():
    try:
        app.run(host="127.0.0.1")
    except Exception as e:
        if type(e) is OSError:
            if e.errno == 98:
                time.sleep(0.1)
                start_flask()
            else:
                raise OSError(e)
        else:
            raise Exception(e)


if __name__ == '__main__':
    flask_pid = check_for_flask_process()

    if flask_pid != -1:
        kill_process(flask_pid)

    create_instances()

    time.sleep(0.5)

    app.run()
