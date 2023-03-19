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
        // .then((countries) => renderCountryInfo(countries))
        .catch((error) => console.log(error));
    }, DEBOUNCE_DELAY)
);


function renderCountryList(countries) {
    
    if (countries.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
    } else if (countries.length === 1) {
        const countryListMarkup = countries
            .map((country) => {
                return `
            <li>
            <img src="${country.flags.svg}" alt="flag" width="20px" height="15px"></img>
            ${country.name.official}
            </li>`;
            })
            .join("");
        countryList.innerHTML = countryListMarkup;

        const countryInfoMarkup = countries
            .map((country) => {
                return `
                <p><b>Capital:</b> ${country.capital}</p>
                <p><b>Population:</b> ${country.population}</p>
                <p><b>Languages:</b> ${country.languages.values}</p>
                `
            })
            .join("");
        countryInfo.innerHTML = countryInfoMarkup;
    } else {
        const countryListMarkup = countries
            .map((country) => {
                return `
            <li>
            <img src="${country.flags.svg}" alt="flag" width="20px" height="15px"></img>
            ${country.name.official}
            </li>`;
            })
            .join("");
        countryList.innerHTML = countryListMarkup;
    }
}
    
// function renderCountryInfo(countries) {
//     // if (countryListMarkup.input === country) {
//         const countryInfoMarkup = countries
//             .map((country) => {
//                 return `
//                 <p><b>Capital:</b> ${country.capital}</p>
//                 <p><b>Population:</b> ${country.population}</p>
//                 <p><b>Languages:</b> ${country.languages.values}</p>
//                 `
//             })
//             .join("");
//         countryInfo.innerHTML = countryInfoMarkup;
//     }



