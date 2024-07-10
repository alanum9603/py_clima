const CITY_QUERY = document.getElementById('cityquery');
const CITY_LIST = document.getElementById('city_list');
const CLIMATE_RESULTS = document.getElementById('climate-results');
const CLIMATE_OPT = document.getElementById('climate-opt');
const CLIMATE_CHART = document.getElementById('climate-chart').getContext('2d');
const CITY_URL = 'api/location?location=';
const CLIMATE_URL = 'api/climate';

CITY_QUERY.addEventListener('submit', (event)=>{
    event.preventDefault();
    let location = document.getElementById('location').value;
    fetch(CITY_URL + location)  
        .then(response => response.json())
        .then(data => show_cities(data))
        .catch(error => console.log(error))  
})
    
function get_climate(lat, lon, info){
    console.log(CLIMATE_URL + '?lat=' + lat + '&lon=' + lon)
    fetch(CLIMATE_URL + '?lat=' + lat + '&lon=' + lon)  
        .then(response => response.json())
        .then(data => show_climate(data, info))
        .catch(error => console.log(error))     
};

function show_cities(data) {
    console.log(data)
    let city_list = "";
    let climate_graph = ``;
    if (data.length != 0){
        for(let i = 0; i < Object.keys(data).length; i++) {
        city_list += `
        <div class="list-group-item">
            <div class="d-flex">
                <div class="p-2 flex-grow-1">` + data[i].name + `, ` + data[i].state + ` - ` + data[i].country + `</div>
                <div class="p-2">
                    <button onclick="get_climate(lat=` + data[i].lat + `,lon=` + data[i].lon + `,info='` + data[i].name + `, ` + data[i].state + ` - ` + data[i].country + `')">>></button>
                </div>
            </div>
        </div>
            `
        };
    } else {
        city_list += '<label class="list-group-item">Sin resultados encontrados</label>'
    }
    CITY_LIST.innerHTML = city_list;
};

function show_climate(data, info){
    console.log(data);
    let climate_daily = ``;
    let climate_opt = ``;
    let dates = data['dates'];
    let morning = data['morning'];
    let day = data['day'];
    let evening = data['evening'];
    let night = data['night']; 
    if (Object.keys(data).length != 0){
        climate_daily += `
            <div class="row align-items-start">
                <h1>` + data["temp"] + `°C </h1>
                <p>
                    ` + info + `<br>
                    Presión atmosférica: ` + data["pressure"] + `hPa <br>
                    Humedad: ` + data["humidity"] + `% <br>
                    Nubosidad: ` + data["clouds"] + `% <br>
                    Índice UV: ` + data["uvi"] + ` <br>
                    Visibilidad: ` + data["visibility"] + `km <br>
                </p>
            </div>
            `;
        climate_opt += `
            <div class="btn-group d-flex justify-content-center" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-info" onclick="graph_climate("` + data['dates'] + `","` + data['morning'] + `")" >Mañana</button>
                <button type="button" class="btn btn-primary" onclick="graph_climate("` + data['dates'] + `","` + data['day'] + `") >Día</button>
                <button type="button" class="btn btn-success" onclick="graph_climate("` + data['dates'] + `","` + data['evening'] + `") >Tarde</button>
                <button type="button" class="btn btn-dark" onclick="graph_climate("` + data['dates'] + `","` + data['night'] + `") >Noche</button>
            </div>
            <canvas id="climate-chart"></canvas>
            `;
    } else {
        climate_daily += '<label>No results found</label>';

    };
    CLIMATE_RESULTS.innerHTML = climate_daily;
    CLIMATE_OPT.innerHTML = climate_opt;
    graph_climate(data['dates'], data['morning']);
};

function graph_climate(dates, temps){
    console.log(dates);
    console.log(temps)
    let climate_chart = new Chart(CLIMATE_CHART, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Temperatura',
                data: temps,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWith: 1.5
            }],
        }
    })
}; 
