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
            <div class="row justify-content-between">
                <div class="col-8">` + data[i].name + `, ` + data[i].state + ` - ` + data[i].country + `</div>
                <div class="col-2">
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
    let dates = data['daily']['dates'];
    let morning = data['daily']['morning'];
    let day = data['daily']['day'];
    let evening = data['daily']['evening'];
    let night = data['daily']['night']; 
    if (Object.keys(data).length != 0){
        climate_daily += `
            <div class="row align-items-start">
                <h1>` + data["current"]["temp"] + `°C </h1>
                <p>
                    ` + info + `<br>
                    Presión atmosférica: ` + data["current"]["pressure"] + `hPa <br>
                    Humedad: ` + data["current"]["humidity"] + `% <br>
                    Nubosidad: ` + data["current"]["clouds"] + `% <br>
                    Índice UV: ` + data["current"]["uvi"] + ` <br>
                    Visibilidad: ` + data["current"]["visibility"]/1000 + `km <br>
                </p>
            </div>
            `;
        climate_opt += `
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-info">Mañana</button>
                <button type="button" class="btn btn-primary">Día</button>
                <button type="button" class="btn btn-success">Tarde</button>
                <button type="button" class="btn btn-dark">Noche</button>
            </div>
            <canvas id="climate-chart"></canvas>
            `;
    } else {
        climate_daily += '<label>No results found</label>';

    };
    CLIMATE_RESULTS.innerHTML = climate_daily;
    CLIMATE_OPT.innerHTML = climate_opt;
    graph_climate(dates, morning);
};

function graph_climate(dates, temps){
    console.log(dates);
    console.log(temps)
    let climate_chart = new Chart(CLIMATE_CHART, {
        type: 'bar',
        data: {
            labels: dates,
            datasets: [{
                label: 'Temperatura',
                data: temps,
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)'],
                borderWith: 1.5
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })
}; 

    

    