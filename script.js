const degrees = document.getElementById("degrees");

const latitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");
const altitude = document.getElementById("altitude");
const moon = document.getElementById("moon");
const sun = document.getElementById("sun");
const solarTime = document.getElementById("solarTime");

const gpsStatus = document.getElementById("gpsStatus");
const accuracy = document.getElementById("accuracy");


const compass = document.querySelector("object");


let currentHeading = 0;
let targetHeading = 0;



compass.addEventListener("load", ()=>{


const svg = compass.contentDocument;

const needle = svg.getElementById("needle");



function animate(){


let difference = targetHeading - currentHeading;


if(difference > 180){
    difference -= 360;
}


if(difference < -180){
    difference += 360;
}


currentHeading += difference * 0.08;



needle.setAttribute(
"transform",
`rotate(${currentHeading} 250 250)`
);



requestAnimationFrame(animate);


}


animate();



window.addEventListener(
"deviceorientation",
(event)=>{


if(event.alpha === null){

degrees.textContent="NO SENSOR";
return;

}



targetHeading =
Math.round(360 - event.alpha);



degrees.textContent =
targetHeading
.toString()
.padStart(3,"0")
+"°";



});


});



// GPS

if(navigator.geolocation){


navigator.geolocation.watchPosition(

(position)=>{

gpsStatus.textContent = "ONLINE";

latitude.textContent =
position.coords.latitude.toFixed(4)+"°";


longitude.textContent =
position.coords.longitude.toFixed(4)+"°";


if(position.coords.altitude){

altitude.textContent =
Math.round(position.coords.altitude)+" m";

}
else{

altitude.textContent="N/A";

}

accuracy.textContent =
Math.round(position.coords.accuracy)+" m";

},


(error)=>{

gpsStatus.textContent="ERROR";


latitude.textContent="--";
longitude.textContent="--";
altitude.textContent="--";
accuracy.textContent="--";

},


{
enableHighAccuracy:true,

maximumAge:1000,

timeout:10000
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
