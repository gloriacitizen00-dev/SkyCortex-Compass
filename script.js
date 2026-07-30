const degrees = document.getElementById("degrees");

const compass = document.querySelector("object");

let currentHeading = 0;
let targetHeading = 0;


compass.addEventListener("load", () => {

    const svg = compass.contentDocument;
    const needle = svg.getElementById("needle");


    function animate(){

        let difference = targetHeading - currentHeading;


        // evitar giro largo (ej: 359 a 0)
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
                degrees.textContent = "NO SENSOR";
                return;
            }


            targetHeading = Math.round(
                360 - event.alpha
            );


            if(targetHeading >= 360){
                targetHeading = 0;
            }


            degrees.textContent =
            targetHeading
            .toString()
            .padStart(3,"0")
            +"°";


        }
    );


});
