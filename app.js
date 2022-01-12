let loc = document.getElementById("location");
let weatherIcon = document.getElementById("display");
let temperature = document.getElementById("temp");
let info = document.getElementById("temp-info");
let iconFile;
const key = config.API_KEY;

window.addEventListener("load", () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;
            fetch(api)
                .then((response) => {
                    return response.json();
                })
                .then(data => {
                    const {name} = data;
                    const {temp} = data.main;
                    const {id, icon, main} = data.weather[0];
                    loc.textContent = name;
                    info.textContent = main;
                    temperature.textContent = Math.round((temp-273.15) * 9/5 + 32) + " °F";
                    if (id < 250) {
                        weatherIcon.src = 'images/storm.png';
                    } else if (id < 350) {
                        weatherIcon.src = 'images/rain.png';
                    } else if (id < 550) {
                        weatherIcon.src = 'images/rain.png';
                    } else if (id < 650) {
                        weatherIcon.src = 'images/snow.png';
                    } else if (id < 750) {
                        weatherIcon.src = 'images/fog.png';
                    } else if (id === 800 && icon === "01n") {
                        weatherIcon.src = 'images/moon.png';
                    } else if (id === 800 && icon === "01d") {
                        weatherIcon.src = 'images/sun.png';
                    }else if (id > 800) {
                        weatherIcon.src = 'images/clouds.png';
                    }
                    console.log(data);
                })
        })
    } else {
        loc.textContent = "Please enable location services";
    }
});