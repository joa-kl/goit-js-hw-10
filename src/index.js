import './css/styles.css';
import { fetchCountries } from '../fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;
const fetchCountriesInput = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

fetchCountriesInput.addEventListener("input", debounce(() => {
    fetchCountries()
        .then((countries) => renderCountryList(countries))
        .catch((error) => console.log(error));
    }, DEBOUNCE_DELAY)
);


function renderCountryList(countries) {
    if (countries.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
    } else {
        const countryListMarkup = countries
            .map((country) => {
                return `
            <img src="${country.flags.svg}" alt="flag" width="20px" height="20px"></img>
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
};

