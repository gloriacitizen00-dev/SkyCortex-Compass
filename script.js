const degrees = document.getElementById("degrees");


let heading = 0;


setInterval(()=>{


    heading++;


    if(heading >= 360){

        heading = 0;

    }


    degrees.textContent =
        heading.toString().padStart(3,"0") + "°";


},100);
