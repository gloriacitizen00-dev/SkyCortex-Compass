import navigationEngine from "./modules/NavigationEngine.js";

const gpsSupported = navigationEngine.initialize();

console.log("Navigation Engine:", navigationEngine);
console.log("GPS Supported:", gpsSupported);

const degrees = document.getElementById("degrees");

const direction = document.getElementById("direction");

const latitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");
const altitude = document.getElementById("altitude");
const moon = document.getElementById("moon");
const sun = document.getElementById("sun");
const solarTime = document.getElementById("solarTime");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const solarAltitude = document.getElementById("solarAltitude");


const gpsStatus = document.getElementById("gpsStatus");
const accuracy = document.getElementById("accuracy");


const compass = document.querySelector("object");


let currentHeading = 0;
let compassOffset = 121;
let targetHeading = 0;
let map;
let marker;
let accuracyCircle;


function getDirection(angle){

    if(angle >= 337.5 || angle < 22.5){
        return "N";
    }

    if(angle >= 22.5 && angle < 67.5){
        return "NE";
    }

    if(angle >= 67.5 && angle < 112.5){
        return "E";
    }

    if(angle >= 112.5 && angle < 157.5){
        return "SE";
    }

    if(angle >= 157.5 && angle < 202.5){
        return "S";
    }

    if(angle >= 202.5 && angle < 247.5){
        return "SW";
    }

    if(angle >= 247.5 && angle < 292.5){
        return "W";
    }

    return "NW";

}



compass.addEventListener("load", ()=>{


const svg = compass.contentDocument;

const needle = svg.getElementById("needle");

const compassRotation =
svg.getElementById("needle");



function animate(){


let difference = targetHeading - currentHeading;


if(difference > 180){
    difference -= 360;
}


if(difference < -180){
    difference += 360;
}


currentHeading += difference * 0.08;



compassRotation.setAttribute(
"transform",
`rotate(${-currentHeading} 250 250)`
);



requestAnimationFrame(animate);


}


animate();



window.addEventListener("deviceorientation", (event) => {

    console.log("DEVICE ORIENTATION");
    console.log("alpha:", event.alpha);
    console.log("beta:", event.beta);
    console.log("gamma:", event.gamma);
    console.log("webkitCompassHeading:", event.webkitCompassHeading);

});


if(event.alpha === null){

degrees.textContent="NO SENSOR";
return;

}



if(event.webkitCompassHeading){

    targetHeading =
    Math.round(event.webkitCompassHeading);

    console.log(targetHeading);

}
    
else{

    targetHeading =
    Math.round(event.alpha + compassOffset);

    gpsStatus.textContent = targetHeading + " RAW";

}

if(targetHeading >= 360){
    targetHeading -= 360;
}

if(targetHeading < 0){
    targetHeading += 360;
}



degrees.textContent =
Math.round(targetHeading)
.toString()
.padStart(3,"0")
+"°";


direction.textContent =
getDirection(Math.round(targetHeading));


rotateMarker(targetHeading);



});


});



// GPS

// GPS

if (navigator.geolocation) {

    gpsStatus.textContent = "SEARCHING...";


    navigator.geolocation.watchPosition(

        (position)=>{

            gpsStatus.textContent = "ONLINE";

            latitude.textContent =
            position.coords.latitude.toFixed(5) + "°";
updateMap(
    position.coords.latitude,
    position.coords.longitude,
    position.coords.accuracy
);


            longitude.textContent =
            position.coords.longitude.toFixed(5) + "°";

            updateSun(
    position.coords.latitude,
    position.coords.longitude
);


            if(position.coords.altitude !== null){

                altitude.textContent =
                Math.round(position.coords.altitude) + " m";

            }
            else{

                altitude.textContent = "N/A";

            }


            accuracy.textContent =
            Math.round(position.coords.accuracy) + " m";


        },


        (error)=>{

            switch(error.code){

                case 1:
                    gpsStatus.textContent =
                    "PERMISSION DENIED";
                    break;

                case 2:
                    gpsStatus.textContent =
                    "NO SIGNAL";
                    break;

                case 3:
                    gpsStatus.textContent =
                    "TIMEOUT";
                    break;

default:
    gpsStatus.textContent =
    "ERROR " + error.code;

            }

        },


        {
            enableHighAccuracy:true,
            maximumAge:0,
            timeout:15000
        }

    );


}

function moonPhase(){

    const knownNewMoon = new Date("2024-01-11");

    const today = new Date();


    const days =
    (today - knownNewMoon) /
    (1000 * 60 * 60 * 24);


    const cycle = 29.53;


    const phase =
    days % cycle;


    let name;


    if(phase < 1){
        name="🌑 New Moon";
    }
    else if(phase < 7.4){
        name="🌒 Waxing Crescent";
    }
    else if(phase < 8.8){
        name="🌓 First Quarter";
    }
    else if(phase < 14.7){
        name="🌔 Waxing Gibbous";
    }
    else if(phase < 16){
        name="🌕 Full Moon";
    }
    else if(phase < 22){
        name="🌖 Waning Gibbous";
    }
    else if(phase < 23.5){
        name="🌗 Last Quarter";
    }
    else{
        name="🌘 Waning Crescent";
    }


    moon.textContent=name;

}


moonPhase();

function updateSolarTime(){

    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();


    solarTime.textContent =
    hours.toString().padStart(2,"0")
    + ":" +
    minutes.toString().padStart(2,"0");


    if(hours >= 6 && hours < 18){

        sun.textContent = "☀️ DAY";

    }
    else{

        sun.textContent = "🌙 NIGHT";

    }

}

updateSolarTime();

setInterval(
    updateSolarTime,
    60000
);

function updateSun(lat, lon){

    const now = new Date();


    const times = SunCalc.getTimes(
        now,
        lat,
        lon
    );


    sunrise.textContent =
    times.sunrise.toLocaleTimeString([],{
        hour:"2-digit",
        minute:"2-digit"
    });


    sunset.textContent =
    times.sunset.toLocaleTimeString([],{
        hour:"2-digit",
        minute:"2-digit"
    });


    const position = SunCalc.getPosition(
        now,
        lat,
        lon
    );


    const solarAngle =
    position.altitude * 180 / Math.PI;


    solarAltitude.textContent =
    solarAngle.toFixed(1)+"°";


    if(solarAngle > 0){

        sun.textContent="☀️ DAY";

    }
    else{

        sun.textContent="🌙 NIGHT";

    }

}

function updateMap(lat, lon, accuracyValue){


if(!map){

    map = L.map("map").setView(
        [lat,lon],
        15
    );


L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
        maxZoom:19,
        attribution:"SkyCortex Satellite View"
    }
).addTo(map);


   const compassIcon = L.divIcon({

    className:"compass-marker",

    html:`
    <div class="arrow-container">
        <div id="arrow">
            ▲
        </div>
    </div>
`,

    iconSize:[40,40],
    iconAnchor:[20,20]

});


marker = L.marker(
    [lat,lon],
    {
        icon: compassIcon
    }
).addTo(map);

accuracyCircle = L.circle(
    [lat, lon],
    {
        radius: accuracyValue,
        color:"#38bdf8",
        fillOpacity:0.15
    }
).addTo(map);


}
else{


    map.setView(
        [lat,lon]
    );


    marker.setLatLng(
        [lat,lon]
    );


}


}

function rotateMarker(angle){

    const arrow = document.getElementById("arrow");

    if(!arrow){
        return;
    }


    arrow.style.transform =
    `rotate(${angle}deg)`;

}

