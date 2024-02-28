async function getIPAddress() {
    try {
      const response = await fetch('https://geo.ipify.org/api/v2/country,city?apiKey=at_qAYSlGbMocnyVBCQYLa1hE0EofQ60');
      
      const data = await response.json();
      
      const inputIp = document.getElementById('input-ip');
      const ipText = document.getElementById('ip-text');
      const cityText = document.getElementById('city-text');
      const timezoneText = document.getElementById('timezone-text');
      const ispText = document.getElementById('isp-text');

      inputIp.value = data.ip;
      ipText.innerText = data.ip;
      cityText.innerText = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
      timezoneText.innerText = data.location.timezone;
      ispText.innerText = data.isp;

    } catch (error) {
      console.error('Error al obtener la IP del usuario:', error);
    }
  }

//window.onload(getIPAddress());

