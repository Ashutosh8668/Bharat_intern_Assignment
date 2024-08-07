const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const weatherIcon = document.querySelector('.weather-box img');

search.addEventListener('click', () => {
    const APIKey = '98740f4ebc0d63bc0f8ba70090e5a091';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                weatherIcon.style.opacity = '0'; // Ensure weather image is hidden
                return;
            }
            container.style.height = '555px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');
            weatherIcon.style.opacity = '1'; // Show weather image

            switch (json.weather[0].main) {
                case 'Clear':
                    weatherIcon.src = 'images/clear.png';
                    break;
                case 'Rain':
                    weatherIcon.src = 'images/rain.png';
                    break;  
                case 'Snow':
                    weatherIcon.src = 'images/snow.png';
                    break;
                case 'Mist':
                    weatherIcon.src = 'images/mist.png';
                    break;
                case 'Haze':
                    weatherIcon.src = 'images/haze.png';
                    break;
                default:
                    weatherIcon.src = 'images/cloud.png';
                    break;
            }

            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            weatherDetails.remove('active');
            weatherIcon.remove('active'); // Ensure weather image is hidden
        });
});
