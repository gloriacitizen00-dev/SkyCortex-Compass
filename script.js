const degrees = document.getElementById("degrees");

const latitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");
const altitude = document.getElementById("altitude");


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


},


(error)=>{

latitude.textContent="ERROR";

},


{
enableHighAccuracy:true
}


);


}
