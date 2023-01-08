import json
import os
import time
from datetime import datetime

from flask import Flask, make_response, request, jsonify
from flask_cors import CORS

from services.database_service import DatabaseService
from services.test_service import TestService

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
CORS(app)

database_service = None
test_service = None


@app.route('/get', methods=['GET'])
def get_all_measurements():
    try:
        return make_response(jsonify(database_service.get_measurements()), 200)
    except Exception as ex:
        return make_response({
            "error": str(ex)
        }, 500)


@app.route("/dates", methods=['GET'])
def get_dates():
    try:
        dates = list(
            set(datetime.strptime(date['MeasurementDate'], '%Y-%m-%d').date() for date in database_service.get_dates())
        )
        return make_response(jsonify([datetime.strftime(date, '%d/%m/%Y') for date in dates]), 200)
    except Exception as ex:
        return make_response({
            "error": str(ex)
        }, 500)


@app.route("/date", methods=['GET'])
def get_by_date():
    try:
        data = request.get_json()
        return make_response(
            jsonify(database_service.get_by_date(datetime.strptime(data['date'], '%d/%m/%Y').date())),
            200
        )
    except Exception as ex:
        return make_response({
            "error": str(ex)
        }, 500)


@app.route('/get/<int:measurement_id>')
def get_measurement(measurement_id):
    try:
        return make_response(database_service.get_measurement(measurement_id), 200)
    except Exception as ex:
        return make_response({
            "error": str(ex)
        }, 500)


@app.route('/add', methods=['POST'])
def add_measurement():
    try:
        data = request.get_json()
        if data['fibonacci_count'] <= 75:
            now = datetime.now()
            data['measurement_time'] = str(now.time())
            data['measurement_date'] = str(now.date())
            data['test_duration'] = test_service.run_test(data['language'], data['fibonacci_count'])
            database_service.add_measurement(data)
            return make_response(jsonify(data), 200)
        return make_response({
            "error": "Too much words"
        }, 400)
    except Exception as ex:
        return make_response({
            "error": str(ex)
        }, 500)


@app.route('/delete', methods=['DELETE'])
def delete_measurement():
    try:
        database_service.delete_measurement(request.args['id'])
        return make_response({
            "result": "successful"
        }, 200)
    except Exception as ex:
        return make_response({
            "error": str(ex)
        }, 500)


def create_instances():
    global database_service
    global test_service

    with open("./appsettings.json") as configuration_file:
        configuration = json.load(configuration_file)
        database_configuration = configuration['database_configuration']
        test_configuration = configuration['test_configuration']

    database_service = DatabaseService(database_configuration)
    test_service = TestService(test_configuration)

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
