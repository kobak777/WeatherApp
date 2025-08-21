import { directionOfWind, capitalizeFirstLetter, createWeatherItem } from "./helper.js";
import { translations, currentLang } from "./translate.js";

export const createContent = (data) => {
  const t = translations[currentLang];

  const main = document.createElement('main');
  main.innerHTML = `
    <section class="weather">
      <div class="container weather__container">
        <div class="weather__inner">
          <img class="weather__icon" src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
          <h2 class="weather__temperature">${Math.floor(data.main.temp)}</h2>
          <span class="weather__units">o</span>
        </div>
        <p class="weather__description">${capitalizeFirstLetter(data.weather[0].description)}</p>
        <div class="weather-info">
          <ul class="weather-info__list">
            ${createWeatherItem(t.wind, `${data.wind.speed} ${t.units.speed}, ${directionOfWind(data.wind.deg)}`)}
            ${createWeatherItem(t.pressure, data.main.pressure + ' ' + t.units.pressure)}
            ${createWeatherItem(t.humidity, data.main.humidity + t.units.humidity)}
            ${createWeatherItem(t.cloudiness, data.clouds.all + t.units.cloudiness)}
          </ul>
        </div>
      </div>
    </section>
  `;
  return main;
};
