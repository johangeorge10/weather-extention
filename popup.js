import { apiKey } from './config.js';

document.addEventListener('DOMContentLoaded', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
                console.log('Constructed API URL:', apiUrl);
                fetch(apiUrl)
                  .then(response => {
                      console.log('API response:', response);
                      return response.json();
                  })
                  .then(data => {
                      console.log('Weather data:', data);
                      if (data.name && data.main && data.weather) {
                          const temp = data.main.temp;
                          document.getElementById('location').textContent = `Location: ${data.name}`;
                          document.getElementById('temperature').textContent = `Temperature: ${temp}°C`;
                          document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`;
                      } else {
                          document.getElementById('location').textContent = 'Error retrieving location';
                          document.getElementById('temperature').textContent = 'Error retrieving temperature';
                          document.getElementById('description').textContent = 'Error retrieving weather description';
                      }
                  })
                  .catch(error => {
                      console.error('Error fetching weather data:', error);
                      document.getElementById('location').textContent = 'Error fetching data';
                  });
            },
            (error) => {
                console.error('Error getting location:', error);
                document.getElementById('location').textContent = 'Unable to retrieve location';
            }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
        document.getElementById('location').textContent = 'Geolocation is not supported by this browser.';
    }
});
