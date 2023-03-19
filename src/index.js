import './css/styles.css';
import { fetchCountries } from '../fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const fetchCountriesInput = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

fetchCountriesInput.addEventListener("input", () => {
    fetchCountries()
        .then((countries) => renderCountryList(countries))
        .catch((error) => console.log(error));
});


function renderCountryList(countries) {
    const countryListMarkup = countries
        .map((country) => {
            return `
            <svg src="${country.flags.svg}" alt="flag"></svg>
            ${country.name.official}`;
        })
        .join("");
    countryList.innerHTML = countryListMarkup;

    const countryInfoMarkup = countries
        .map((country) => {
            return `
            <p><b>Capital:</b> ${country.capital}</p>
            <p><b>Population:</b> ${country.population}</p>
            <p><b>Languages:</b> ${country.languages}</p>
            `
        })
        .join("");
    countryInfo.innerHTML = countryInfoMarkup;
}

