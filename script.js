const needle = document.getElementById("needle");
const degrees = document.getElementById("degrees");

let angle = 0;

function animate(){

    angle += 1;

    if(angle >= 360){
        angle = 0;
    }

    needle.setAttribute(
        "transform",
        `rotate(${angle} 225 225)`
    );

    degrees.textContent = angle + "°";

    requestAnimationFrame(animate);

}

animate();
