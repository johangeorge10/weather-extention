document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '';  // Replace with your actual API key from open weather api which is a free to create
    const city = 'thiruvalla';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    let temp=0;
    fetch(apiUrl)
      .then(response => {
        console.log('API response:', response);
        return response.json();
      })
      .then(data => {
        console.log('Weather data:', data);
        if (data.name && data.main && data.weather) {
        //   temp=data.main.temp-273.15;
        //   temp = parseFloat(temp.toFixed(1));
        temp=data.main.temp;
          console.log(temp);
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
  });
  