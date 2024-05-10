//SELECTORES
const input = document.querySelector('#input-country');
const container = document.querySelector('#list-countries');
const information= document.querySelector('#information');
const info= document.querySelector('#info');

let countries= [];
const getCountries = async () => {
    // Llamo a la API Rest Countries
    try{
        const result=  await (await fetch('https://restcountries.com/v3.1/all')).json();
        countries=result;
        console.log(countries);
    } catch (error) {
        console.log(error);
    }

  }
  getCountries();



    input.addEventListener('input' , async e => {
        
        const seacrh= e.target.value.toLowerCase();
         let countryInfoHTML = '';
             // Verificar si el input está vacío
        //FILTRAR PAISES 
        // Filtrar países por la primera letra del nombre oficial
                const filteredCountries = countries.filter(name => name.name.common.toLowerCase().startsWith(seacrh));
    
                information.innerHTML =''
                info.innerHTML = '';
                    
            if (filteredCountries.length === 0) {
                    information.innerHTML = '<p class="info" >No se encontraron países que coincidan con la búsqueda.</p>';
            } else if (filteredCountries.length > 10) {
                    info.innerHTML = '<p class="info">Demasiados países, especifica mejor tu búsqueda.</p>';
            } else if (filteredCountries.length === 1) {

            // Realizar una solicitud a la API de clima para obtener información adicional
                const clain = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${filteredCountries[0].latlng[0]}&lon=${filteredCountries[0].latlng[1]}&appid=8f34169f4b90140d83b5baedd9753685&units=metric`)).json();
                    const temp= clain.main.temp; 
                    const icon= clain.weather[0].icon;
                    const country = filteredCountries[0];
                    const name = country.name.common;
                    const timezones = country.timezones[0];
                    const capital = country.capital;
                    const population = country.population;
                    const languages = country.languages ? Object.values(country.languages).join(', ') : 'No se encontraron idiomas';
                    const continents = country.region;
                    const region = country.subregion;
                    const flag = country.flags.svg;
                
                // Construir el HTML para mostrar la información del país y el clima
                    countryInfoHTML += `
                        <div class="countries-item-1">
                            <div id="country-img">
                                <img class="banderas1" src="${flag}" alt="${name}">
                            </div>
                            <div id="info-country">
                                <p class="info-country"><h3 id="p-info">${name}</h3></p>
                                <p class="info-country">${capital}</p>
                                <p class="info-country">${timezones}</p>
                                <p class="info-country">${population} habitantes</p>
                                <p class="info-country">${languages}</p>
                                <p class="info-country">${continents}</p>
                                <p class="info-country">${region}</p>
                                    <div class="icons"> 
                                        <img class="clain-icon" src= "https://openweathermap.org/img/wn/${icon}@2x.png">
                                        <p class="info-country"> ${temp} Celcius</p>
                                    </div>
                            </div>  
                        </div>  
                        `;
             } else{
                  // Mostrar solo nombres y banderas de los países si hay menos de 10
                filteredCountries.forEach(country => {
                    const name = country.name.common;
                    const flag = country.flags.svg;
                    countryInfoHTML += `
                        <li class="countries-item">
                            <div id="country-img">
                                <img class="banderas" src="${flag}" alt="${name}">
                            </div>
                            <div id="info-country">
                                    <p class="info-p-country">${name}</p>
                            </div>
                        </li>
                        `;
                    });
                }
                container.innerHTML = countryInfoHTML;
                if (seacrh === '') {
                    // Si está vacío, limpiar el contenido de info y salir de la función
                    info.innerHTML = '';
                    return;
                        }
                     
            
                
            
});








