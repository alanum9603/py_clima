from flask import Blueprint, jsonify, request
import requests

from config import Config

API_Key = Config.API_KEY
api_scope = Blueprint('api', __name__)


@api_scope.route('/climate', methods = ['GET'])
def get_climate():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    url = f'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude=hourly,minutely&units=metric&appid={API_Key}'
    res = requests.get(url) 
    data = res.json()
    return data

@api_scope.route('/climate/location', methods = ['GET'])
def get_location():
    location = request.args.get('location')
    url = f'http://api.openweathermap.org/geo/1.0/direct?q={location}&limit=5&appid={API_Key}'
    res = requests.get(url) 
    data = res.json()
    return data