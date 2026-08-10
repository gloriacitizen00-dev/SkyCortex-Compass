import navigationEngine from "./modules/NavigationEngine.js";

const gpsSupported = navigationEngine.initialize();

console.log("Navigation Engine:", navigationEngine);
console.log("GPS Supported:", gpsSupported);


// ===============================
// ELEMENTOS DE LA INTERFAZ
// ===============================

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


// ===============================
// DIRECCIONES
// ===============================

function getDirection(angle) {

    if (angle >= 337.5 || angle < 22.5) {
        return "N";
    }

    if (angle >= 22.5 && angle < 67.5) {
        return "NE";
    }

    if (angle >= 67.5 && angle < 112.5) {
        return "E";
    }

    if (angle >= 112.5 && angle < 157.5) {
        return "SE";
    }

    if (angle >= 157.5 && angle < 202.5) {
        return "S";
    }

    if (angle >= 202.5 && angle < 247.5) {
        return "SW";
    }

    if (angle >= 247.5 && angle < 292.5) {
        return "W";
    }

    return "NW";
}


// ===============================
// PRUEBA DEL SENSOR DE ORIENTACIÓN
// ===============================

window.addEventListener("deviceorientation", (event) => {

    console.log("================================");
    console.log("DEVICE ORIENTATION");
    console.log("alpha:", event.alpha);
    console.log("beta:", event.beta);
    console.log("gamma:", event.gamma);
    console.log(
        "webkitCompassHeading:",
        event.webkitCompassHeading
    );
    console.log("================================");

});


// ===============================
// GPS
// ===============================

if (navigator.geolocation) {

    gpsStatus.textContent = "SEARCHING...";

    navigator.geolocation.watchPosition(

        (position) => {

            gpsStatus.textContent = "ONLINE";

            latitude.textContent =
                position.coords.latitude.toFixed(5) + "°";

            longitude.textContent =
                position.coords.longitude.toFixed(5) + "°";

            if (position.coords.altitude !== null) {

                altitude.textContent =
                    Math.round(position.coords.altitude) + " m";

            } else {

                altitude.textContent = "N/A";

            }

            accuracy.textContent =
                Math.round(position.coords.accuracy) + " m";

            console.log("GPS POSITION:", position.coords);

        },

        (error) => {

            switch (error.code) {

                case 1:

                    gpsStatus.textContent =
                        "PERMISSION DENIED";

                    console.log(
                        "GPS ERROR: PERMISSION DENIED"
                    );

                    break;

                case 2:

                    gpsStatus.textContent =
                        "NO SIGNAL";

                    console.log(
                        "GPS ERROR: NO SIGNAL"
                    );

                    break;

                case 3:

                    gpsStatus.textContent =
                        "TIMEOUT";

                    console.log(
                        "GPS ERROR: TIMEOUT"
                    );

                    break;

                default:

                    gpsStatus.textContent =
                        "ERROR " + error.code;

                    console.log(
                        "GPS ERROR:",
                        error
                    );

            }

        },

        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 15000
        }

    );

} else {

    gpsStatus.textContent = "GPS NOT SUPPORTED";

}


// ===============================
// LUNA
// ===============================

function moonPhase() {

    const knownNewMoon =
        new Date("2024-01-11");

    const today =
        new Date();

    const days =
        (today - knownNewMoon) /
        (1000 * 60 * 60 * 24);

    const cycle = 29.53;

    const phase =
        days % cycle;

    let name;

    if (phase < 1) {
        name = "🌑 New Moon";
    }

    else if (phase < 7.4) {
        name = "🌒 Waxing Crescent";
    }

    else if (phase < 8.8) {
        name = "🌓 First Quarter";
    }

    else if (phase < 14.7) {
        name = "🌔 Waxing Gibbous";
    }

    else if (phase < 16) {
        name = "🌕 Full Moon";
    }

    else if (phase < 22) {
        name = "🌖 Waning Gibbous";
    }

    else if (phase < 23.5) {
        name = "🌗 Last Quarter";
    }

    else {
        name = "🌘 Waning Crescent";
    }

    if (moon) {
        moon.textContent = name;
    }

}

moonPhase();


// ===============================
// HORA SOLAR
// ===============================

function updateSolarTime() {

    const now = new Date();

    const hours =
        now.getHours();

    const minutes =
        now.getMinutes();

    if (solarTime) {

        solarTime.textContent =
            hours.toString().padStart(2, "0")
            + ":"
            +
            minutes.toString().padStart(2, "0");

    }

    if (sun) {

        if (hours >= 6 && hours < 18) {

            sun.textContent = "☀️ DAY";

        } else {

            sun.textContent = "🌙 NIGHT";

        }

    }

}

updateSolarTime();

setInterval(
    updateSolarTime,
    60000
);
