const api = {
  key: "775c315138ac6a8474ba8e2ab5afd4a2",
  url: "https://api.openweathermap.org/data/2.5/weather",
};

const card = document.getElementById("card");

const city = document.getElementById("city");
const date = document.getElementById("date");
const tempImg = document.getElementById("temp-img");
const temp = document.getElementById("temp");
const weather = document.getElementById("weather");
const range = document.getElementById("range");

const search = async (query) => {
  try {
    const response = await fetch(
      `${api.url}?q=${query}&appid=${api.key}&lang=es`
    );
    const data = await response.json();

    card.style.display = "block";

    city.innerHTML = `${data.name}, ${data.sys.country}`;
    date.innerHTML = new Date().toLocaleDateString();
    temp.innerHTML = `${toCelsius(data.main.temp)} °C`;
    weather.innerHTML = data.weather[0].description;
    range.innerHTML = `${toCelsius(data.main.temp_min)} °C / ${toCelsius(
      data.main.temp_max
    )} °C`;
    updateImages(data);
  } catch (error) {
    console.error(error);
    alert("Hubo un error");
  }
};

const updateImages = (data) => {
  const temp = toCelsius(data.main.temp);
  let src = "./images/temp-mid.png";
  if (temp > 26) {
    src = "./images/temp-high.png";
  } else if (temp < 20) {
    src = "./images/temp-low.png";
  }
};

const toCelsius = (kelvin) => {
  return Math.round(kelvin - 273.15);
};

const onSubmit = (event) => {
  event.preventDefault();
  search(searchbox.value);
};

const form = document.getElementById("search-form");
const searchbox = document.getElementById("search-box");

form.addEventListener("submit", onSubmit, true);
