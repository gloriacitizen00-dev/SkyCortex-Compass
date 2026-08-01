class NavigationEngine {

    constructor() {

        this.state = {

            supported: false,
            tracking: false,
            watchId: null,

            latitude: null,
            longitude: null,
            altitude: null,

            accuracy: null,
            speed: null,
            heading: null,

            timestamp: null,
            lastUpdate: null,

            previousPosition: null,
            totalDistance: 0

        };

    }

    initialize() {

        this.state.supported = "geolocation" in navigator;

        return this.state.supported;

    }

}

const navigationEngine = new NavigationEngine();

export default navigationEngine;
