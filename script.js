```javascript
import navigationEngine from "./modules/NavigationEngine.js";


// ===============================
// NAVIGATION ENGINE
// ===============================

const gpsSupported =
    navigationEngine.initialize();

console.log(
    "Navigation Engine:",
    navigationEngine
);

console.log(
    "GPS Supported:",
    gpsSupported
);


// ===============================
// ELEMENTOS DE LA INTERFAZ
// ===============================

const degrees =
    document.getElementById("degrees");

const direction =
    document.getElementById("direction");

const latitude =
    document.getElementById("latitude");

const longitude =
    document.getElementById("longitude");

const altitude =
    document.getElementById("altitude");

const moon =
    document.getElementById("moon");

const sun =
    document.getElementById("sun");

const solarTime =
    document.getElementById("solarTime");

const sunrise =
    document.getElementById("sunrise");

const sunset =
    document.getElementById("sunset");

const solarAltitude =
    document.getElementById("solarAltitude");

const gpsStatus =
    document.getElementById("gpsStatus");

const accuracy =
    document.getElementById("accuracy");


// ===============================
// COMPASS SVG
// ===============================

const compass =
    document.getElementById("compass-svg");

let compassSVG = null;
let needle = null;


// ===============================
// CARGAR COMPASS SVG
// ===============================

if (compass) {

    compass.addEventListener(
        "load",
        () => {

            console.log(
                "COMPASS SVG LOADED"
            );

            compassSVG =
                compass.contentDocument;

            if (!compassSVG) {

                console.log(
                    "ERROR: SVG DOCUMENT NOT AVAILABLE"
                );

                return;
            }

            needle =
                compassSVG.getElementById(
                    "needle"
                );

            console.log(
                "NEEDLE:",
                needle
            );

            if (!needle) {

                console.log(
                    "ERROR: NEEDLE NOT FOUND"
                );

            } else {

                console.log(
                    "COMPASS READY"
                );

            }

        }
    );

} else {

    console.log(
        "ERROR: COMPASS OBJECT NOT FOUND"
    );

}


// ===============================
// DIRECCIÓN
// ===============================

function getDirection(angle) {

    if (
        angle >= 337.5 ||
        angle < 22.5
    ) {
        return "N";
    }

    if (
        angle >= 22.5 &&
        angle < 67.5
    ) {
        return "NE";
    }

    if (
        angle >= 67.5 &&
        angle < 112.5
    ) {
        return "E";
    }

    if (
        angle >= 112.5 &&
        angle < 157.5
    ) {
        return "SE";
    }

    if (
        angle >= 157.5 &&
        angle < 202.5
    ) {
        return "S";
    }

    if (
        angle >= 202.5 &&
        angle < 247.5
    ) {
        return "SW";
    }

    if (
        angle >= 247.5 &&
        angle < 292.5
    ) {
        return "W";
    }

    return "NW";
}


// ===============================
// ROTAR AGUJA
// ===============================

function rotateNeedle(heading) {

    if (!needle) {
        console.log("NEEDLE NOT READY");
        return;
    }

    const rotation = -heading;

    needle.setAttribute(
        "transform",
        `rotate(${rotation} 250 250)`
    );

    console.log(
        "NEEDLE ROTATION:",
        rotation
    );
}


// ===============================
// BRÚJULA
// ===============================

window.addEventListener(
    "deviceorientation",
    (event) => {

        console.log(
            "==============================="
        );

        console.log(
            "DEVICE ORIENTATION"
        );

        console.log(
            "ALPHA:",
            event.alpha
        );

        console.log(
            "BETA:",
            event.beta
        );

        console.log(
            "GAMMA:",
            event.gamma
        );

        console.log(
            "WEBKIT COMPASS:",
            event.webkitCompassHeading
        );


        // ===========================
        // SENSOR NO DISPONIBLE
        // ===========================

        if (
            event.alpha === null
        ) {

            if (degrees) {

                degrees.textContent =
                    "NO SENSOR";

            }

            if (direction) {

                direction.textContent =
                    "--";

            }

            return;
        }


        // ===========================
        // CALCULAR HEADING
        // ===========================

        let heading;


        if (
            typeof event.webkitCompassHeading ===
            "number"
        ) {

            heading =
                event.webkitCompassHeading;

        } else {

            heading =
                event.alpha;

        }


        // ===========================
        // NORMALIZAR 0 - 359
        // ===========================

        heading =
            ((heading % 360) + 360) % 360;


        const roundedHeading =
            Math.round(heading);


        // ===========================
        // MOSTRAR HEADING
        // ===========================

        if (degrees) {

            degrees.textContent =
                roundedHeading
                    .toString()
                    .padStart(3, "0")
                +
                "°";

        }


        // ===========================
        // MOSTRAR DIRECCIÓN
        // ===========================

        const currentDirection =
            getDirection(
                roundedHeading
            );

        if (direction) {

            direction.textContent =
                currentDirection;

        }


        // ===========================
        // ACTUALIZAR AGUJA
        // ===========================

        rotateNeedle(
            heading
        );


        // ===========================
        // DEBUG
        // ===========================

        console.log(
            "HEADING:",
            roundedHeading
        );

        console.log(
            "DIRECTION:",
            currentDirection
        );

    }
);


// ===============================
// GPS
// ===============================

if (
    navigator.geolocation
) {

    if (gpsStatus) {

        gpsStatus.textContent =
            "SEARCHING...";

    }


    navigator.geolocation.watchPosition(

        (position) => {

            console.log(
                "GPS POSITION:",
                position.coords
            );


            if (gpsStatus) {

                gpsStatus.textContent =
                    "ONLINE";

            }


            // =======================
            // LATITUDE
            // =======================

            if (latitude) {

                latitude.textContent =
                    position.coords.latitude
                        .toFixed(5)
                    +
                    "°";

            }


            // =======================
            // LONGITUDE
            // =======================

            if (longitude) {

                longitude.textContent =
                    position.coords.longitude
                        .toFixed(5)
                    +
                    "°";

            }


            // =======================
            // ALTITUDE
            // =======================

            if (
                position.coords.altitude !==
                null
            ) {

                if (altitude) {

                    altitude.textContent =
                        Math.round(
                            position.coords.altitude
                        )
                    +
                    " m";

                }

            } else {

                if (altitude) {

                    altitude.textContent =
                        "N/A";

                }

            }


            // =======================
            // ACCURACY
            // =======================

            if (accuracy) {

                accuracy.textContent =
                    Math.round(
                        position.coords.accuracy
                    )
                +
                " m";

            }

        },


        // ===========================
        // GPS ERROR
        // ===========================

        (error) => {

            switch (error.code) {

                case 1:

                    if (gpsStatus) {

                        gpsStatus.textContent =
                            "PERMISSION DENIED";

                    }

                    console.log(
                        "GPS ERROR: PERMISSION DENIED"
                    );

                    break;


                case 2:

                    if (gpsStatus) {

                        gpsStatus.textContent =
                            "NO SIGNAL";

                    }

                    console.log(
                        "GPS ERROR: NO SIGNAL"
                    );

                    break;


                case 3:

                    if (gpsStatus) {

                        gpsStatus.textContent =
                            "TIMEOUT";

                    }

                    console.log(
                        "GPS ERROR: TIMEOUT"
                    );

                    break;


                default:

                    if (gpsStatus) {

                        gpsStatus.textContent =
                            "ERROR " +
                            error.code;

                    }

                    console.log(
                        "GPS ERROR:",
                        error
                    );

            }

        },


        // ===========================
        // GPS OPTIONS
        // ===========================

        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 15000
        }

    );

} else {

    if (gpsStatus) {

        gpsStatus.textContent =
            "GPS NOT SUPPORTED";

    }

}


// ===============================
// FASE DE LA LUNA
// ===============================

function moonPhase() {

    const knownNewMoon =
        new Date("2024-01-11");

    const today =
        new Date();

    const days =
        (
            today -
            knownNewMoon
        )
        /
        (
            1000 *
            60 *
            60 *
            24
        );

    const cycle =
        29.53;

    const phase =
        days % cycle;

    let name;


    if (phase < 1) {

        name =
            "🌑 New Moon";

    }

    else if (phase < 7.4) {

        name =
            "🌒 Waxing Crescent";

    }

    else if (phase < 8.8) {

        name =
            "🌓 First Quarter";

    }

    else if (phase < 14.7) {

        name =
            "🌔 Waxing Gibbous";

    }

    else if (phase < 16) {

        name =
            "🌕 Full Moon";

    }

    else if (phase < 22) {

        name =
            "🌖 Waning Gibbous";

    }

    else if (phase < 23.5) {

        name =
            "🌗 Last Quarter";

    }

    else {

        name =
            "🌘 Waning Crescent";

    }


    if (moon) {

        moon.textContent =
            name;

    }

}


moonPhase();


// ===============================
// HORA SOLAR
// ===============================

function updateSolarTime() {

    const now =
        new Date();

    const hours =
        now.getHours();

    const minutes =
        now.getMinutes();


    // ===========================
    // HORA
    // ===========================

    if (solarTime) {

        solarTime.textContent =
            hours
                .toString()
                .padStart(2, "0")
            +
            ":"
            +
            minutes
                .toString()
                .padStart(2, "0");

    }


    // ===========================
    // DÍA / NOCHE
    // ===========================

    if (sun) {

        if (
            hours >= 6 &&
            hours < 18
        ) {

            sun.textContent =
                "☀️ DAY";

        } else {

            sun.textContent =
                "🌙 NIGHT";

        }

    }

}


updateSolarTime();


setInterval(
    updateSolarTime,
    60000
);
```
