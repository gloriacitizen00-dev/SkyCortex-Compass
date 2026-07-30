const degrees = document.getElementById("degrees");

const compass = document.querySelector("object");

compass.addEventListener("load", () => {

    const svg = compass.contentDocument;
    const needle = svg.getElementById("needle");


    window.addEventListener("deviceorientation", (event) => {

        let heading = event.alpha;


        if (heading === null) {
            degrees.textContent = "NO SENSOR";
            return;
        }


        heading = Math.round(360 - heading);


        needle.setAttribute(
            "transform",
            `rotate(${heading} 225 225)`
        );


        degrees.textContent =
            heading.toString().padStart(3,"0") + "°";


    });


});
