const CITY_QUERY = document.getElementById('cityquery');
const CITY_LIST = document.getElementById('city_list');
const CITY_URL = 'api/climate/location?location=';
const CLIMATE_URL = 'api/climate';
const CLIMATE_RESULTS = document.getElementById('climate-results');
const CLIMATE_GRAPH = document.getElementById('climate-graph');

CITY_QUERY.addEventListener('submit', (event)=>{
    event.preventDefault();
    let location = document.getElementById('location').value;
    fetch(CITY_URL + location)  
        .then(response => response.json())
        .then(data => show_cities(data))
        .catch(error => console.log(error))  
})

function show_cities(data) {
    let city_list = "";
    let climate_graph = ``;
    if (data.length != 0){
        for(let i = 0; i < Object.keys(data).length; i++) {
        city_list += `
        <div class="list-group-item">
            <div class="row justify-content-between">
                <div class="col-8">` + data[i].name + `, ` + data[i].country + `</div>
                <div class="col-2">
                    <button onclick="get_climate(lat=` + data[i].lat + `,lon=` + data[i].lon + `)">></button>
                </div>
            </div>
        </div>
            `
        };
    } else {
        city_list += '<label class="list-group-item">No results found</label>'
    }
    
    CITY_LIST.innerHTML = city_list;
};

function get_climate(lat, lon){
    console.log(CLIMATE_URL + '?lat=' + lat + '&lon=' + lon)
    fetch(CLIMATE_URL + '?lat=' + lat + '&lon=' + lon)  
        .then(response => response.json())
        .then(data => show_climate(data))
        .catch(error => console.log(error))     
};

function show_climate(data){
    console.log(data);
    let climate_daily = ``;
    let climate_graph = ``;
    if (Object.keys(data).length != 0){
        climate_daily += `
            <div class="row align-items-start">
                <h1>` + data["current"]["temp"] + `°C </h1>
                <p>
                    Presión atmosférica: ` + data["current"]["pressure"] + `hPa <br>
                    Humedad: ` + data["current"]["humidity"] + `% <br>
                    Nubosidad: ` + data["current"]["clouds"] + `% <br>
                    Índice UV: ` + data["current"]["uvi"] + ` <br>
                    Visibilidad: ` + data["current"]["visibility"]/8000 + `km <br>
                </p>
            </div>
            `;
        climate_graph += `
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-primary">Morning</button>
                <button type="button" class="btn btn-primary">Day</button>
                <button type="button" class="btn btn-primary">Evening</button>
                <button type="button" class="btn btn-primary">Night</button>
            </div>
            `;
    } else {
        climate_daily += '<label>No results found</label>';

    };
    CLIMATE_RESULTS.innerHTML = climate_daily;
    CLIMATE_GRAPH.innerHTML = climate_graph;
}
        

        