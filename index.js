

let form = document.getElementById('location-input');
let input = document.getElementById('location');
let datalist = document.getElementById('suggestions');
// let button = document.getElementById('light');
// let mode = 0;

// let main = document.getElementById('main');
// let body = document.getElementsByTagName('body');
// let nav = document.getElementById('nav');
// let faBars = document.getElementById('fa-bars');
// let profileNaming = document.getElementById('profilenaming');
// let faAngleDown = document.getElementById('fa-angle-down');
// let pweather = document.getElementById('pweather');
// let hero = document.getElementById('hero');
// let currentTiming = document.getElementById('current-time');
// let airQuality = document.getElementById('air-quality');
// let measureentId =document.getElementById('measurement-id')
// let faWind = document.getElementById('fa-wind');
// let pTextAir = document.getElementById('ptextair')
// let faEye = document.getElementById('fa-eye')

// button.addEventListener('click', event => {




//     if (mode === 0 ) {
//         document.body.classList.add('body-c')
//         main.classList.remove('main')
//         main.classList.add('main-c')
//         nav.classList.remove('nav');
//         nav.classList.add('nav-c')
//         profileNaming.classList.add('profilenaming-c')
        
//         faAngleDown.classList.add('fa-angle-down-c')
        
//         faBars.classList.add('fa-bars-c')

//         hero.style.background='white'
//         pweather.classList.add('pweather-c')
//         currentTiming.classList.add('current-time-c')
//         console.log(pweather);
//         temperature.classList.add('temperature-c')
//         description.classList.add('description-c')
//         feeling.classList.add('feeling-c')
//         button.classList.add('button-c')
//         airQuality.classList.add('color-dark')
//         measureentId.classList.add('color-dark')
//         faWind.classList.add('color-dark')
//         pTextAir.classList.add('color-dark')
//         windValue.classList.add('color-dark')
//         faEye.classList.add('color-dark')
        
//         mode = 1
//     }else{
//         document.body.classList.remove('body-c')
//         main.classList.remove('main-c')
//         main.classList.add('main')
//         nav.classList.remove('nav-c');
//         nav.classList.add('nav')
//         profileNaming.classList.remove('profilenaming-c')
//         faAngleDown.classList.remove('fa-angle-down-c')
        
//         faBars.classList.remove('fa-bars-c');
        
//         hero.style.background=''
//         pweather.classList.remove('pweather-c')
//         currentTiming.classList.remove('current-time-c')
//         temperature.classList.remove('temperature-c')
//         description.classList.remove('description-c')
//         feeling.classList.remove('feeling-c')
//         button.classList.remove('button-c')
//         airQuality.classList.remove('color-dark')
//         measureentId.classList.remove('color-dark')
//         faWind.classList.remove('color-dark')
//         pTextAir.classList.remove('color-dark')
//         windValue.classList.remove('color-dark')
//         faEye.classList.remove('color-dark')
//         mode = 0
//     }


// })

function handleApiKeyResponse() {
    const apiKey = 'AIzaSyBgL4mOjxY8HNRQxsVrpiZsERPqxsD243k'; 

    
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=places&v=weekly`;
    document.head.appendChild(script);
}

handleApiKeyResponse();

// // Fetch API key from your Cloud Function
// fetch('https://<your-function-endpoint>/<your-function-name>')
//   .then(response => response.json())
//   .then(handleApiKeyResponse)
//   .catch(error => {
//     console.error('Error fetching API key:', error);
//   });

let cityObj = '';
let myArray = [];

form.addEventListener('submit', (event) => {
    event.preventDefault(); 
  

   
    
  });

input.addEventListener('change', (event) =>{
    event.preventDefault()

    cityObj = input.value;
    submitForm();
})


function submitForm(event){

    myArray = cityObj.split(',');
    
    let city = myArray[0];

   
    fetch(`https://jokehi.azurewebsites.net/api/submitForm?city=${city}`)
    .then(response => response.json())
    .then(data => {
     
      handlePrints(data.weatherstack);
    });


    form.reset();


}




//print UI
function handlePrints(handlePrints){
    let imgContainer = document.getElementById('degree-image');
    
    let heroTime = document.getElementById('current-time');
    imgContainer.innerHTML = ``;
    
    let cloudStat = document.getElementById('description');
    let printName = document.getElementById('fullname');
    let feeling = document.getElementById('feeling');
    let descriptionP = document.getElementById('description-p');
    let windValue =  document.getElementById('wind-report');
    let humidityValue = document.getElementById('humidity-report');
    let visibleValue = document.getElementById('visible-report');
    let temperatureValue = document.getElementById('temperature');
    
    let precipValue = document.getElementById('precip-report');
    let pressureValue = document.getElementById('pressure-report');
    
    
    
    console.log(handlePrints);

    let cityName = cityObj
    let feelsLike = `Feels like ${handlePrints.current.feelslike}`; 
    let description = handlePrints.current.weather_descriptions[0]
    let textP = `There will be mostly ${description} skies. The high will be ${handlePrints.current.feelslike} `
    let humidity = `${handlePrints.current.humidity}%`;
    let visible = Math.round(handlePrints.current.visibility * 0.000621371);
    let visibility = `${visible}mi`;
    let tempV = handlePrints.current.temperature;
    console.log(handlePrints.current.temperature);
    
    let precip = handlePrints.current.precip;
    let pressure = handlePrints.current.pressure;
    let windmph = `${handlePrints.current.wind_speed} mph`;
    const currentTime = getCurrentTimeInTimezone(handlePrints.location.timezone_id);
    const timeofDay = hetTimeHour(handlePrints.location.timezone_id);
    console.log(timeofDay.hour);
    
    const AMArray = [0,1,2,3,4,5,6,7,8,9,10,11];
    const period = AMArray.includes(timeofDay.hour) ? 'am' : 'pm';
    const icon = handlePrints.current.weather_icons;
 
    let iconImg = document.createElement('img');
    
    iconImg.setAttribute('src', icon);
    iconImg.classList.add('icon-image');
    iconImg.setAttribute('id','imgIcon');


    imgContainer.append(iconImg);

    imgContainer.style.display = `flex`;

    heroTime.textContent = `${currentTime.hour}:${currentTime.minute}${period.toUpperCase()}`;
    console.log(timeofDay);
    
    
    cloudStat.textContent = description;
    
    feeling.textContent = `${feelsLike}\u00B0C`;
    descriptionP.textContent = `${textP}`;
    windValue.textContent = `${windmph}`;
    humidityValue.textContent = `${humidity}`;
    visibleValue.textContent = `${visibility}`;
    temperatureValue.textContent = `${tempV}\u00B0`;
    
    precipValue.textContent = `${precip}In`;
    pressureValue.textContent = `${pressure}`;





   
  




    const parentDiv = document.getElementById('down');

    // Get all child elements at once
    const childDivs = Array.from(parentDiv.querySelectorAll('.each-item'));

    for (const childDiv of childDivs) {
    // Cache elements within each child div
    const temperatureNew = childDiv.querySelector('#temperature-two');
    const windNew = childDiv.querySelector('#wind-two');
    const humidityNew = childDiv.querySelector('#humidity-two');
    const hourTime = childDiv.querySelector('#one');
    const cloudStatus = childDiv.querySelector('#state-cloud');
    const imgContainer2 = childDiv.querySelector('#cloud-image');
    const cloudDegree = childDiv.querySelector('#cloud-degree');
    const windTwo = childDiv.querySelector('#wind-two');
    const humidityTwo = childDiv.querySelector('#humidity-two');

    // Update text content
    temperatureNew.textContent = `${tempV}`;
    windNew.textContent = `Wind: ${windmph}`;
    humidityNew.textContent = `Humidity: ${humidity}`;
    hourTime.textContent = `${timeofDay.hour}${period.toLocaleUpperCase()}`;
    cloudStatus.textContent = description;

    // Create and add image element
    imgContainer2.innerHTML = ''; // Clear existing content
    const iconImgNew = document.createElement('img');
    iconImgNew.setAttribute('src', icon);
    iconImgNew.classList.add('icon-image');
    iconImgNew.setAttribute('id', 'imgIcon'); // Use a unique ID per element
    imgContainer2.appendChild(iconImgNew);
    imgContainer2.style.display = 'flex';
    }
    printName.textContent = cityName;
    
}


//fetch current time dynamically
function getCurrentTimeInTimezone(timezone) {
    const formatter = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: timezone
    });
    const parts = formatter.formatToParts(new Date());
    let hour, minute;
    parts.forEach(part => {
        if (part.type === 'hour') hour = part.value;
        if (part.type === 'minute') minute = part.value;
    });
    return { 
        hour: parseInt(hour, 10), 
        minute: parseInt(minute, 10) 
    };
}

function hetTimeHour(timezone){
    const formatter = new Intl.DateTimeFormat('en-GB',{
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: timezone
    });
    const parts = formatter.formatToParts(new Date());
    let hour;
    parts.forEach(part => {
        if (part.type === 'hour') {
            hour = part.value
        }
    });
    return{
        hour: parseInt(hour, 10)
    };


}

