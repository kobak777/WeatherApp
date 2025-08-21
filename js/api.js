import { currentLang } from "./translate.js";

export const getWeatherData = async (city) => {
  const trimmedCity = city.trim();
  if (!trimmedCity)
    throw new Error(currentLang === "ru" ? "Введите город!" : "Enter a city!");

  const API_KEY = "464148c6abeba4f24d2ff045deb7909b";
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${trimmedCity}&appid=${API_KEY}&lang=${currentLang}&units=metric`
  );

  if (!response.ok)
    throw new Error(
      currentLang === "ru" ? "Город не найден!" : "City not found!"
    );

  return await response.json();
};
