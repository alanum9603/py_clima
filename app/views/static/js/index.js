document.getElementById('cityquery').addEventListener('submit', (event)=>{
    event.preventDefault();
    let location = document.getElementById('location').value;
    url = 'api/climate/location?location=' + location
    fetch(url)  
        .then(response => response.json())
        .then(data => show_cities(data))
        .catch(error => console.log(error))  
})

function show_cities(data) {
    let city_list = ""
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
        }
    } else {
        city_list += '<label class="list-group-item">No results found</label>'
    }
    
    document.getElementById('city_list').innerHTML = city_list
};

function get_climate(lat, lon){
    url='api/climate?lat=' + lat + '&lon=' + lon
    console.log(url)
    fetch(url)  
        .then(response => response.json())
        .then(data => show_climate(data["current"]))
        .catch(error => console.log(error))     
};

function show_climate(data){
    let climate_daily = "";
    console.log(data)
    if (Object.keys(data).length != 0){
            climate_daily += `
            <div class="row align-items-start">
                <div class="col-6">
                    <h1>` + data["dt"] + `</h1>
                    <p>
                        Nubes: ` + data["dt"] + `
                        Visibilidad: ` + data["visibility"] + `
                        
                    </p>
                </div>
                <div class="col-6">
                    One of three columns
                </div>
            </div>
            `
    } else {
        climate_daily += '<label>No results found</label>'
    };
    document.getElementById('climate-results').innerHTML = climate_daily
}
        

        