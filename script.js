  const apiKey = "dcb66753beab8eeb43ed7f4376e3244e"; // Obtén una API Key de OpenWeatherMap

  const searchForm = document.getElementById("search");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-result");

  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe y recargue la página

    const ciudad = searchInput.value;
    if (ciudad) {
      await obtenerClima(ciudad);
    } else {
      alert("Por favor, ingrese una ciudad.");
    }
  });

  async function obtenerClima(ciudad) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}`
      );
      const data = await response.json();

      if (response.ok) {
        const temperature = Math.round(data.main.temp - 273.15);
        const cityName = data.name;
        const country = data.sys.country;
        const humidity = data.main.humidity;
        const visibility = (data.visibility / 1000).toFixed(1); 
        const feelsLike = Math.round(data.main.feels_like - 273.15) + "°C";

        searchResults.innerHTML = `
        <div id="resultados">
        <p id="ciudad"> ${cityName}, ${country}</p>
        <h2 id="temperatura">${temperature}°C</p> 
        <p id="senTermica">${ feelsLike } <br> Sensacion termica </p>
        <p id="humedad">${ humidity }% <br> Humedad </p>
        <p id="visibilidad"> ${ visibility } Kilometros <br> visibilidad</p>
        </div>
        `;
      } else {
        searchResults.textContent = "Ciudad no encontrada.";
      }
    } catch (error) {
      console.error("Error:", error);
      searchResults.textContent = "Ocurrió un error al obtener el clima.";
    }
  }

