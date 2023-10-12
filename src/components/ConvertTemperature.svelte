<script>
    let temperatureCelsius = 0;
    let temperatureFahrenheit = 0;
    let message = "";
  
    //Celsius to Fahrenheit converter
    function convertToFahrenheit() {
      temperatureFahrenheit = (temperatureCelsius * 9/5) + 32;
      temperatureFahrenheit = temperatureFahrenheit.toFixed(2);
      checkTemperature();
    }
  
    function checkTemperature() {
      if (temperatureCelsius < -40) {
        message = "Erittäin kylmää";
      } else if (temperatureCelsius >= -40 && temperatureCelsius < -20) {
        message = "Melko kylmää";
      } else if (temperatureCelsius >= -20 && temperatureCelsius < -5) {
        message = "Normaali talvipäivä";
      } else if (temperatureCelsius >= -5 && temperatureCelsius < 5) {
        message = "Leutoa";
      } else if (temperatureCelsius >= 5 && temperatureCelsius < 16) {
        message = "Kevättä";
      } else if (temperatureCelsius >= 16 && temperatureCelsius < 26) {
        message = "Lämmintä";
      } else if (temperatureCelsius >= 26 && temperatureCelsius <= 40) {
        message = "Kuumaa";
      } else {
        message = "Anna kelvollinen lämpötila-alue -40 - 40 astetta.";
      }
    }
  </script>
  
  <main>
    <h1>Lämpötilaopas ja Muunnin</h1>
    <div class="converter">
      <label for="temperature-input">Syötä lämpötila Celsius-asteina:</label>
      <input type="number" bind:value={temperatureCelsius} />
      <button on:click={convertToFahrenheit}>Muunna</button>
    </div>
    {#if temperatureFahrenheit !== 0}
      <p class="result">Lämpötila Fahrenheit-asteina: {temperatureFahrenheit} °F</p>
    {/if}
    {#if message}
      <p class="comment">{message}</p>
    {/if}
  </main>
  
  <style>
    main {
      text-align: center;
      padding: 2em;
      margin-top: 5%;
    }
  
    .converter {
      margin-bottom: 20px;
    }
  
    label {
      font-size: 16px;
    }
  
    input {
      width: 80px;
      padding: 5px;
      font-size: 16px;
    }
  
    button {
      background-color: #007bff;
      color: white;
      padding: 5px 10px;
      font-size: 16px;
      border: none;
      cursor: pointer;
    }
  
    button:hover {
      background-color: #0056b3;
    }
  
    .result {
      font-size: 18px;
      margin-top: 10px;
      color: green;
    }
  
    .comment {
      font-size: 18px;
      margin-top: 10px;
      color: #333;
    }
  </style>