import '../../css/styles.css';

const DEBOUNCE_DELAY = 300;

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries  from './fetchCountries.js'

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));



function onInput(e) {
  const inputValue = e.target.value.trim();
 if (!inputValue) {
  destroyCard(countryList);
  destroyCard(countryInfo);
  
  return;
 }

 fetchCountries(inputValue).then(data =>  {
  
  if (data.length > 10) { 
    Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );

  destroyCard(countryList);
  destroyCard(countryInfo);
  return;
 }

 renderMarkup(data);
   
 }).catch(err => {
  destroyCard(countryList);
  destroyCard(countryInfo);

  Notiflix.Notify.failure("Oops, there is no country with that name");
 });
}

function markupCountryList(countries)  {
return countries.map(

  ({ name, flags }) => 
  `<li class = list> 
  <img class = img-list src = "${flags.svg}" alt = "${name.official}" >
  ${name.official}
  </li>`
).join("");

}

function destroyCard(card) {
    card.innerHTML = "";

}
function markupCountryInfo(country)  {
  return country.map(({ name, capital, population, flags, languages }) => {
    return `
        <h1 class="name"><img class = img src="${flags.svg} " alt="${
      name.official
    }" ${name.official}</h1>
        <p class="text">Capital: ${capital[0]}</p>
        <p class="text">Population: ${population}</p>
        <p class="text">Languages: ${Object.values(languages).join(',')}</p>
      `;
  });
}

function renderMarkup(countries) {
  if (countries.length === 1) {
    destroyCard(countryList);
    countryInfo.innerHTML = markupCountryInfo(countries);
  }
  else {
  destroyCard(countryInfo);
  countryList.innerHTML = markupCountryList(countries);
  }
}