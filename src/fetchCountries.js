const url = "https://restcountries.com/v3.1/name";

export default function fetchCountries(name) {
    
  return fetch(`${url}/${name}?fields=name,capital,population,flags,languages`)
  .then(res => {
    return res.json();})
    };