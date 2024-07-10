from flask import Blueprint, jsonify, request
from ..models.models import Location, Climate
from ..controller import climate_controller

api_scope = Blueprint('api', __name__)

@api_scope.route('/climate', methods = ['GET'])
def get_climate():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    query = Location(lat=lat, lon=lon)
    climate_new = climate_controller.list_climate(query)
    return jsonify(climate_new._asdict())

@api_scope.route('/location', methods = ['GET'])
def get_location():
    location = request.args.get('location')
    query = Location(name=location)
    locations_list = climate_controller.list_location(query)
    locations_dict = [loc._asdict() for loc in locations_list]
    return jsonify(locations_dict)
