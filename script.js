window.addEventListener('deviceorientation', (event) => {
  const needle = document.getElementById('needle');
  const direction = document.getElementById('direction');
  const heading = event.alpha;
  needle.style.transform = `rotate(${heading}deg)`;
  direction.textContent = `Dirección: ${Math.round(heading)}°`;
});

