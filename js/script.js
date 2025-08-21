import { getWeatherData } from "./api.js";
import { resetWeatherContent } from "./helper.js";

const app = async () => {
  const city = JSON.parse(localStorage.getItem("city")) || "Москва";

  try {
    const weather = await getWeatherData(city);
    resetWeatherContent(weather.name, weather);

  } catch (e) {
    console.error("Ошибка получения погоды:", e);
  }
};

window.addEventListener("DOMContentLoaded", app);
