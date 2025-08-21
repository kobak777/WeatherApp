import { createHeader } from "./appHeader.js";  
import { createContent } from "./appContent.js";
import { translations, currentLang } from "./translate.js";

export const directionOfWind = (deg) => {
  const dirs = translations[currentLang].directions;
  return dirs[Math.round(deg / 45)];
};

export const capitalizeFirstLetter = str => str[0].toUpperCase() + str.slice(1);

export const cToF = c => c * 9 / 5 + 32;
export const fToC = f => (f - 32) * 5 / 9;

export const createWeatherItem = (title, value) => `
  <li class="weather-info__item">
    <span>${title}</span>
    <p>${value}</p>
  </li>
`;

export const updateTemperature = (unit) => {
  const tempEl = document.querySelector(".weather__temperature");
  const unitEl = document.querySelector(".weather__units");
  if (!tempEl) return;

  let temp = +tempEl.textContent;
  if (unit === "C" && unitEl.textContent === "F") {
    temp = fToC(temp);
    unitEl.textContent = translations[currentLang].units.tempC;
  } else if (unit === "F" && unitEl.textContent === "°C") {
    temp = cToF(temp);
    unitEl.textContent = translations[currentLang].units.tempF;
  }
  tempEl.textContent = Math.round(temp);
};

export const resetWeatherContent = (city, weather) => {
  localStorage.setItem("city", JSON.stringify(city));
  document.body.innerHTML = "";
  const header = createHeader(city);
  const content = createContent(weather);
  document.body.append(header, content);
};
