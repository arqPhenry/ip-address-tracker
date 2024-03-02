const map = L.map('map', {zoomControl: false});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  minZoom: 13,
  maxZoom: 19,
  reuseTiles: true, 
  unloadInvisibleTiles: true,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const inputIp = document.getElementById('input-ip');
const ipText = document.getElementById('ip-text');
const cityText = document.getElementById('city-text');
const timezoneText = document.getElementById('timezone-text');
const ispText = document.getElementById('isp-text');
const primaryButton = document.getElementById('obtenerIPbutton');

function esDireccionIP(entrada) {
  const regexIP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  return regexIP.test(entrada);
}

function esDominio(entrada) {
  const regexDominio = /^[a-zA-Z0-9][a-zA-Z0-9-]*\.[a-zA-Z]{2,}$/;
  return regexDominio.test(entrada);
}

async function getIPAddress(parameter) {
    let url;

    if (esDireccionIP(parameter)){
      url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_qAYSlGbMocnyVBCQYLa1hE0EofQ60&ipAddress=${parameter}`;
    } else if (esDominio(parameter)){
      url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_qAYSlGbMocnyVBCQYLa1hE0EofQ60&domain=${parameter}`;
    } else{
      url = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_qAYSlGbMocnyVBCQYLa1hE0EofQ60';
    }

    try {
      const response = await fetch(`${url}`);
      
      const data = await response.json();

      ipText.innerText = data.ip;
      cityText.innerText = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
      timezoneText.innerText = `UTC ${data.location.timezone}` ;
      ispText.innerText = data.isp;

      map.setView([data.location.lat, data.location.lng], 13);

      const marker = L.marker([data.location.lat, data.location.lng]).addTo(map);
      marker.bindPopup(`${data.location.lat}, ${data.location.lng}`);
      marker.openPopup();

    } catch (error) {
      console.error('Error al obtener la IP o Dominio buscado:', error);
    }
  }

primaryButton.addEventListener('click', () => getIPAddress(inputIp.value));

window.onload(getIPAddress());

