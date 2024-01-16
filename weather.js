const apiKey = "ed4cf3c25f3e727ebb307fe9e674eef8";

const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const humidIcon = document.querySelector(".humidityIcon");
const windIcon = document.querySelector(".windIcon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    const data = await response.json();

    if (response.status == 404) {
      // Display an error message when the city is not found
      document.querySelector(".city").innerHTML = "City not found";
    } else {
      // Display the fetched city name and weather data
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + " °C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
      }

      weatherIcon.classList.remove("d-none");
      humidIcon.classList.remove("d-none");
      windIcon.classList.remove("d-none");
    }
  } catch (error) {}
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
