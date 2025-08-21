import { getWeatherData } from "./api.js";
import { handleWeatherByGeolocation } from "./geolocation.js";
import { cToF, fToC, resetWeatherContent } from "./helper.js";
import { translations, currentLang, setLang } from "./translate.js";

export const createHeader = (city) => {
  const t = translations[currentLang];
  
  const header = document.createElement("header");
  header.innerHTML = `
    <div class="container header__container">
      <div class="header__city">
        <h1 class="city__name">${city}</h1>
        <div class="city__inner">
          <button class="city__change btn-reset">${t.changeCity}</button>
          <button class="city__location btn-reset">${t.myLocation}</button>
        </div>
      </div>

      <div class="header__buttons">
        <div class="header__units">
          <button class="units__c btn-reset unit-current">C</button>
          <button class="units__f btn-reset">F</button>
        </div>
        <div class="header__langs">
          <button class="lang__ru btn-reset ${currentLang === "ru" ? "unit-current" : ""}">RU</button>
          <button class="lang__en btn-reset ${currentLang === "en" ? "unit-current" : ""}">EN</button>
        </div>
      </div>
    </div>
  `;

  const headerCity = header.querySelector(".header__city");
  const cityChange = header.querySelector(".city__change");
  const cityLocation = header.querySelector(".city__location");
  const unitsC = header.querySelector(".units__c");
  const unitsF = header.querySelector(".units__f");
  const btnRu = header.querySelector(".lang__ru");
  const btnEn = header.querySelector(".lang__en");
  const cityName = header.querySelector(".city__name");
  const cityInner = header.querySelector(".city__inner");

  const searchBlock = document.createElement("div");
  const searchInput = document.createElement("input");
  const searchBtn = document.createElement("button");
  const errorBlock = document.createElement("p");

  searchBlock.classList.add("search");
  searchInput.classList.add("search_input");
  searchBtn.classList.add("search_btn");
  errorBlock.classList.add("search__error");
  searchBtn.textContent = t.ok;
  searchBlock.append(searchInput, searchBtn, errorBlock);

  const showSearch = () => {
    cityName.style.display = "none";
    cityInner.style.display = "none";
    searchBlock.style.display = "flex";
  };

  const hideSearch = () => {
    cityName.style.display = "";
    cityInner.style.display = "";
    searchBlock.style.display = "none";
    errorBlock.classList.remove("show-error");
  };

  headerCity.append(searchBlock);
  hideSearch();
  cityChange.addEventListener("click", showSearch);

  const showError = (msg) => {
    errorBlock.classList.add("show-error");
    errorBlock.textContent = msg;
  };

  searchBtn.addEventListener("click", async () => {
    if (!searchInput.value) {
      showError(t.enterCityError);
      return;
    }
    try {
      const weather = await getWeatherData(searchInput.value);
      resetWeatherContent(weather.name, weather);
    } catch (e) {
      showError(e.message);
    }
  });

  window.addEventListener("click", (e) => {
    if (!searchBlock.contains(e.target) && !cityChange.contains(e.target)) {
      hideSearch();
      searchInput.value = "";
    }
  });

  unitsC.addEventListener('click', () => {
    if(unitsC.classList.contains('unit-current')) return;
    unitsC.classList.add('unit-current');
    unitsF.classList.remove('unit-current');
    document.querySelector('.weather__units').textContent = 'o';
    const temperature = document.querySelector('.weather__temperature');
    temperature.textContent = Math.round(fToC(+temperature.textContent));
  });

  unitsF.addEventListener('click', () => {
    if(unitsF.classList.contains('unit-current')) return;
    unitsF.classList.add('unit-current');
    unitsC.classList.remove('unit-current');
    document.querySelector('.weather__units').textContent = 'f';
    const temperature = document.querySelector('.weather__temperature');
    temperature.textContent = Math.round(cToF(+temperature.textContent));
  });

  cityLocation.addEventListener("click", handleWeatherByGeolocation);

  btnRu.addEventListener("click", async () => {
    setLang("ru");
    const weather = await getWeatherData(city);
    resetWeatherContent(weather.name, weather);
  });

  btnEn.addEventListener("click", async () => {
    setLang("en");
    const weather = await getWeatherData(city);
    resetWeatherContent(weather.name, weather);
  });

  return header;
};
