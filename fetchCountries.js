const fetchCountriesInput = document.querySelector("#search-box");
import Notiflix from 'notiflix';

export function fetchCountries(country) {
    const countryName = `https://restcountries.com/v3.1/name/` + fetchCountriesInput.value.trim() + `?fields=name,capital,population,flags,languages`;
    return fetch(`${countryName}`)
        .then((response) => {
            if (!response.ok) {
                Notiflix.Notify.failure("Oops, there is no country with that name");
            }
            return response.json();
        }
    );
}