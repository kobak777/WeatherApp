import { getWeatherData } from "./api.js";
import { resetWeatherContent } from "./helper.js";
import { currentLang } from "./translate.js";

export const handleWeatherByGeolocation = () => {
  const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };
  const LOCATION_API_KEY = "1b5483e422664b5888dfb38bc2188ef0";

  const success = async (pos) => {
    const { latitude, longitude } = pos.coords;
    const res = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&lang=${currentLang}&apiKey=${LOCATION_API_KEY}`);
    const result = await res.json();
    const city = result.features[0].properties.city;

    const weather = await getWeatherData(city);
    resetWeatherContent(city, weather);
  };

  const error = (err) => console.log(err.code, err.message);
  navigator.geolocation.getCurrentPosition(success, error, options);
};
