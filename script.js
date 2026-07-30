const needle = document.getElementById("needle");
const degrees = document.getElementById("degrees");

let angle = 0;

setInterval(() => {

    angle += 1;

    if (angle >= 360) {
        angle = 0;
    }

    needle.style.transform =
        `translate(-50%, -100%) rotate(${angle}deg)`;

    degrees.textContent = angle + "°";

}, 30);
