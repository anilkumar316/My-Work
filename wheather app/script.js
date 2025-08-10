const API_KEY = "bd5e378503939ddaee76f12ad7a97608"; // TEST KEY

const cityInput = document.getElementById("cityInput");
const cityDropdown = document.getElementById("cityDropdown");
const recentCitiesDiv = document.getElementById("recentCities");
const errorMsg = document.getElementById("errorMsg");
const resultDiv = document.getElementById("weatherResult");

function getWeatherByCity() {
  const city = cityInput.value.trim();
  if (!city) {
    showError("Please enter a city name.");
    return;
  }
  fetchWeather(city);
  saveRecentCity(city);
}

function getWeatherByLocation() {
  if (!navigator.geolocation) {
    showError("Geolocation is not supported.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      fetch(
        `https://openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      )
        .then(res => res.json())
        .then(data => {
          if (data.cod !== 200) {
            showError("Unable to fetch location weather.");
            return;
          }
          displayWeather(data);
        })
        .catch(() => showError("Location weather error."));
    },
    () => showError("Failed to get location.")
  );
}

function fetchWeather(city) {
  fetch(
    `https://openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  )
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        showError("City not found.");
        return;
      }
      displayWeather(data);
      fetchForecast(city);
    })
    .catch(() => showError("Error fetching weather."));
}

function displayWeather(data) {
  errorMsg.classList.add("hidden");
  resultDiv.classList.remove("hidden");

  document.getElementById("cityName").textContent = data.name;
  document.getElementById("description").textContent =
    data.weather[0].description;
  document.getElementById("temperature").textContent =
    "🌡️ Temperature: " + data.main.temp + " °C";
  document.getElementById("humidity").textContent =
    "💧 Humidity: " + data.main.humidity + "%";
  document.getElementById("windSpeed").textContent =
    "💨 Wind Speed: " + data.wind.speed + " m/s";
  document.getElementById("weatherIcon").src =
    "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
}

function fetchForecast(city) {
  fetch(
    `https://openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  )
    .then(res => res.json())
    .then(data => {
      const forecastDiv = document.getElementById("forecast");
      forecastDiv.innerHTML = "";

      const daily = {};
      data.list.forEach(item => {
        const date = item.dt_txt.split(" ")[0];
        if (!daily[date] && item.dt_txt.includes("12:00:00")) {
          daily[date] = item;
        }
      });

      Object.keys(daily)
        .slice(0, 5)
        .forEach(date => {
          const item = daily[date];
          const card = document.createElement("div");
          card.className =
            "bg-blue-100 p-3 rounded shadow text-sm flex items-center gap-2";
          card.innerHTML = `
            <div>
              <p class="font-bold">${date}</p>
              <img src="https://openweathermap.org/img/wn/${
                item.weather[0].icon
              }@2x.png" alt="icon" class="w-10 h-10" />
              <p>${item.main.temp} °C</p>
              <p>💧 ${item.main.humidity}%</p>
              <p>💨 ${item.wind.speed} m/s</p>
            </div>
          `;
          forecastDiv.appendChild(card);
        });
    });
}

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.remove("hidden");
  resultDiv.classList.add("hidden");
}

function saveRecentCity(city) {
  let cities = JSON.parse(localStorage.getItem("recentCities")) || [];
  if (!cities.includes(city)) {
    cities.unshift(city);
    if (cities.length > 5) cities.pop();
    localStorage.setItem("recentCities", JSON.stringify(cities));
  }
  loadRecentCities();
}

function loadRecentCities() {
  let cities = JSON.parse(localStorage.getItem("recentCities")) || [];
  if (cities.length === 0) {
    recentCitiesDiv.classList.add("hidden");
    return;
  }

  recentCitiesDiv.classList.remove("hidden");
  cityDropdown.innerHTML = "";
  cities.forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    cityDropdown.appendChild(option);
  });

  cityDropdown.onchange = () => {
    cityInput.value = cityDropdown.value;
    getWeatherByCity();
  };
}

window.onload = loadRecentCities;
