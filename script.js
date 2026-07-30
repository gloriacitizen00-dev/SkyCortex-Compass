const degrees = document.getElementById("degrees");

let heading = 0;


// encontrar el SVG dentro del object
const compass = document.querySelector("object");


compass.addEventListener("load", () => {

    const svg = compass.contentDocument;

    const needle = svg.getElementById("needle");


    setInterval(()=>{


        heading += 10;


        if(heading >= 360){
            heading = 0;
        }


        needle.setAttribute(
            "transform",
            `rotate(${heading} 225 225)`
        );


        degrees.textContent =
            heading.toString().padStart(3,"0") + "°";


    },500);


});
