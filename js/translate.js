export const translations = {
  ru: {
    changeCity: "Сменить город",
    myLocation: "Мое местоположение",
    enterCityError: "Введите город!",
    cityNotFound: "Город не найден!",
    wind: "Ветер",
    pressure: "Давление",
    humidity: "Влажность",
    cloudiness: "Облачность",
    ok: "ОК",
    directions: [
      "северный", "северо-восточный", "восточный", "юго-восточный",
      "южный", "юго-западный", "западный", "северо-западный", "северный"
    ],
    units: {
      tempC: "°C",
      tempF: "°F",
      speed: "м/с",
      pressure: "мм рт. ст.",
      humidity: "%",
      cloudiness: "%"
    }
  },
  en: {
    changeCity: "Change city",
    myLocation: "My location",
    enterCityError: "Enter a city!",
    cityNotFound: "City not found!",
    wind: "Wind",
    pressure: "Pressure",
    humidity: "Humidity",
    cloudiness: "Cloudiness",
    ok: "OK",
    directions: [
      "north", "north-east", "east", "south-east",
      "south", "south-west", "west", "north-west", "north"
    ],
    units: {
      tempC: "°C",
      tempF: "°F",
      speed: "m/s",
      pressure: "hPa",
      humidity: "%",
      cloudiness: "%"
    }
  }
};

export let currentLang = localStorage.getItem("lang") || "ru";

export const setLang = (lang) => {
  currentLang = lang;
  localStorage.setItem("lang", lang);
};
