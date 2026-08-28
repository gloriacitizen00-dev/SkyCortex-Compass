// Rotación de la aguja con el magnetómetro
window.addEventListener('deviceorientation', (event) => {
  const needle = document.getElementById('needle');
  const direction = document.getElementById('direction');
  const heading = event.alpha; // orientación del dispositivo
  needle.setAttribute('transform', `rotate(${heading},250,250)`);
  direction.textContent = `Dirección: ${Math.round(heading)}°`;
});

// GPS: latitud, longitud y altitud
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((pos) => {
    document.getElementById('latitude').textContent = `Latitud: ${pos.coords.latitude.toFixed(4)}`;
    document.getElementById('longitude').textContent = `Longitud: ${pos.coords.longitude.toFixed(4)}`;
    document.getElementById('altitude').textContent = `Altitud: ${pos.coords.altitude !== null ? pos.coords.altitude.toFixed(2) + ' m' : '--'}`;
  }, (error) => {
    console.error(error);
    document.getElementById('latitude').textContent = "Latitud: --";
    document.getElementById('longitude').textContent = "Longitud: --";
    document.getElementById('altitude').textContent = "Altitud: --";
  });
}
