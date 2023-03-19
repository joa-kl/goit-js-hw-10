const fetchCountriesInput = document.querySelector("#search-box");

export function fetchCountries(country) {
    const countryName = `https://restcountries.com/v3.1/name/` + fetchCountriesInput.value.trim() + `?fields=name,capital,population,flags,languages`;
    return fetch(`${countryName}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        }
    );
}