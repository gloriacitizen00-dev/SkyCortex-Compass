const degrees = document.getElementById("degrees");

const direction = document.getElementById("direction");

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



if(event.webkitCompassHeading){

    targetHeading =
    Math.round(event.webkitCompassHeading);

}
else{

    targetHeading =
    Math.round(360 - event.alpha);

}



degrees.textContent =
targetHeading
.toString()
.padStart(3,"0")
+"°";

direction.textContent =
getDirection(targetHeading);



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


            longitude.textContent =
            position.coords.longitude.toFixed(5) + "°";


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


