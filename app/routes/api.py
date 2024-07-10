from flask import Blueprint, jsonify, request
from datetime import datetime, timedelta
import requests

from config import Config

API_Key = Config.API_KEY
api_scope = Blueprint('api', __name__)

@api_scope.route('/climate', methods = ['GET'])
def get_climate():
    n = 8
    date_start = datetime.now() + timedelta(days=1)
    date_end = date_start + timedelta(days=n-1)
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    url = f'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude=hourly,minutely&units=metric&appid={API_Key}'
    req = requests.get(url) 
    data = req.json()
    res = {}
    res['current'] = {
        'uvi' :         data['current']['uvi'],
        'temp' :        data['current']['temp'],
        'clouds' :      data['current']['clouds'],
        'humidity' :    data['current']['humidity'],
        'pressure' :    data['current']['pressure'],
        'visibility' :  data['current']['visibility']
    }
    res['daily'] = {
        'dates' :   [(date_start + timedelta(days=d)).strftime("%Y-%m-%d")
                    for d in range((date_end - date_start).days + 1)],
        'morning' : [data['daily'][i]['temp']['morn'] for i in range(0, n)],
        'day' :     [data['daily'][i]['temp']['day'] for i in range(0, n)],
        'evening' : [data['daily'][i]['temp']['eve'] for i in range(0, n)],
        'night' :   [data['daily'][i]['temp']['night'] for i in range(0, n)]
    }
    return jsonify(res)

@api_scope.route('/location', methods = ['GET'])
def get_location():
    location = request.args.get('location')
    url = f'http://api.openweathermap.org/geo/1.0/direct?q={location}&limit=5&appid={API_Key}'
    req = requests.get(url) 
    data = req.json()
    res = []
    for i in range(0,5) :
        res.append({
            'lat' : data[i]['lat'],
            'lon' : data[i]['lon'],
            'name' : data[i]['name'],
            'state' : data[i]['state'],
            'country' : data[i]['country']
        })
    return jsonify(res)

