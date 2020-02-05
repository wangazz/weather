const API_KEY = 'c04cac165e46169ecd1c5c896043a5a2';
const PROXY = 'https://cors-anywhere.herokuapp.com/';

window.addEventListener('load', () => {
    let long;
    let lat;
    const temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const locationTimezone = document.querySelector('.location-timezone');
    const temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;

            const API = `${PROXY}https://api.darksky.net/forecast/${API_KEY}/${lat},${long}`;

            fetch(API)
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    const { temperature, summary, icon } = data.currently;
                    temperatureDegree.textContent = Math.floor(temperature);
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    let temperatureInCelcius = Math.floor((temperature - 32) * (5 / 9));

                    setIcons(icon, document.querySelector('.icon'));

                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === 'F') {
                            temperatureDegree.textContent = temperatureInCelcius;
                            temperatureSpan.textContent = 'C';
                        } else {
                            temperatureDegree.textContent = temperature;
                            temperatureSpan.textContent = 'F';
                        }
                    });
                });
        });
    } else {
        h1.textContent = 'Location not found.';
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: 'white' });
        const currentIcon = icon.replace(/-/g, '_').toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
