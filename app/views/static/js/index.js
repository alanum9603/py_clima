const CITY_QUERY = document.getElementById('cityquery');
const CITY_LIST = document.getElementById('city_list');
const CLIMATE_RESULTS = document.getElementById('climate-results');
const CLIMATE_OPT = document.getElementById('climate-opt');
const CLIMATE_CHART = document.getElementById('climate-chart').getContext('2d');
const CITY_URL = 'api/location?location=';
const CLIMATE_URL = 'api/climate';
const BACKGROUNDCOLOR = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
    ];
const BORDERCOLOR = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
    ];
let climate_chart = new Chart();

CITY_QUERY.addEventListener('submit', (event)=>{
    event.preventDefault();
    let location = document.getElementById('location').value;
    fetch(CITY_URL + location)  
        .then(response => response.json())
        .then(data => show_cities(data))
        .catch(error => console.log(error))  
})
    
function get_climate(lat, lon, info){
    fetch(CLIMATE_URL + '?lat=' + lat + '&lon=' + lon)  
        .then(response => response.json())
        .then(data => show_climate(data, info))
        .catch(error => console.log(error))     
};

function show_cities(data) {
    let city_list = "";
    let climate_graph = ``;
    if (data.length != 0){
        for(let i = 0; i < Object.keys(data).length; i++) {
            city_list += `
            <div class="list-group-item">
                <div class="d-flex">
                    <div class="p-2 flex-grow-1">` + data[i].name + `, ` + data[i].state + ` - ` + data[i].country + `</div>
                    <div class="p-2">
                        <button class="btn btn-outline-warning" onclick="get_climate(lat=` + data[i].lat + `,lon=` + data[i].lon + `,info='` + data[i].name + `, ` + data[i].state + ` - ` + data[i].country + `')">>></button>
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
    let climate_daily = ``;
    let climate_opt = ``;
    let dates = data['dates'].join(`','`);
    let temps = data['temps']
    if (Object.keys(data).length != 0){
        climate_daily += `
            <div class="row align-items-start">
                <h1>` + data["temp"] + `°C </h1>
                <p>
                    ` + info + `<br>
                    <b>Presión atm:</b> ` + data["pressure"] + `hPa <br>
                    <b>Humedad:</b> `      + data["humidity"] + `%     <br>
                    <b>Nubosidad:</b> `    + data["clouds"] + `%       <br>
                    <b>Índice UV:</b> `    + data["uvi"] + `           <br>
                    <b>Visibilidad:</b> `  + data["visibility"] + `km  <br>
                </p> 
            </div>
            `;
        climate_opt += `<div class="btn-group d-flex justify-content-center" role="group" aria-label="Basic example">`;
        for(i in temps){
            climate_opt += `
                <button type="button" class="btn btn-` + temps[i][1] + `" onclick="graph_climate(['`   + dates + `'],[` + temps[i][2] + `])" >` + temps[i][0] + `</button>
            `;
        };
        climate_opt += `</div>`;
    } else {
        climate_daily += '<label>No results found</label>';
    };
    CLIMATE_RESULTS.innerHTML = climate_daily;
    CLIMATE_OPT.innerHTML = climate_opt;
    graph_climate(data['dates'], temps[1][2])
};

function graph_climate(dates, temps){
    climate_chart.destroy();
    climate_chart = new Chart(CLIMATE_CHART, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Temperatura',
                data: temps,
                backgroundColor: BACKGROUNDCOLOR,
                borderColor: BORDERCOLOR,
                borderWith: 1.5
            }],
        }
    })
}; 
