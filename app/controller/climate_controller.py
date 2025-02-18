from typing import List
from datetime import datetime, timedelta
from config import Config
import requests
import json

API_Key = Config.API_KEY
from ..models.models import Location, Climate

def list_location(query: Location) -> List[Location] :
    query_dict = query._asdict()
    url = 'http://api.openweathermap.org/geo/1.0/direct?q=' + query_dict['name'] + '&limit=5&appid=' + API_Key
    req = requests.get(url) 
    data = req.json()
    locations = []
    for i in data :
        location = Location(
            lat = i['lat'], 
            lon = i['lon'], 
            name = i['name'], 
            state = i['state'], 
            country = i['country']
            )
        locations.append(location)
    return locations

def list_climate(query: Location) -> Climate :
    query_dict = query._asdict()
    url = 'https://api.openweathermap.org/data/3.0/onecall?lat=' + query_dict['lat'] + '&lon=' + query_dict['lon'] + '&exclude=hourly,minutely&units=metric&appid=' + API_Key
    req = requests.get(url) 
    data = req.json()
    n = len(data['daily'])
    date_start = datetime.now() + timedelta(days=1)
    date_end = date_start + timedelta(days=n-1)
    climate = Climate(
        uvi=data['current']['uvi'],
        temp=data['current']['temp'],
        clouds=data['current']['clouds'],
        humidity=data['current']['humidity'],
        pressure=data['current']['pressure'],
        visibility=data['current']['visibility']/1000,
        dates=[(date_start + timedelta(days=d)).strftime("%Y-%m-%d")
                    for d in range((date_end - date_start).days + 1)],
        temps=[
            ['Mañana', 'info',[data['daily'][i]['temp']['morn']
                for i in range(0, n)]],
            ['Día', 'primary', [data['daily'][i]['temp']['day']
                for i in range(0, n)]],
            ['Tarde', 'success', [data['daily'][i]['temp']['eve']
                for i in range(0, n)]],
            ['Noche', 'dark', [data['daily'][i]['temp']['night']
                for i in range(0, n)]]
        ]
    )
    return climate