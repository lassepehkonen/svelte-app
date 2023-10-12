<script>
    let kilometers = 0;
    let passengers = 0;
    let mileageRate = 0.53; // Kilometrikorvaus 53 senttiä per km
    let totalMileage = 0;
  
    function calculateMileage() {
      totalMileage = (kilometers * mileageRate) + (kilometers * passengers * 0.04);
    }
  </script>
  
  <main>
    <h1>Kilometrikorvauksen laskuri</h1>
    <div class="input-container">
      <label for="kilometers">Matkustettujen kilometrien määrä:</label>
      <input type="number" id="kilometers" bind:value={kilometers} />
    </div>
    <div class="input-container">
      <label for="passengers">Kuljetettavien henkilöiden määrä:</label>
      <input type="number" id="passengers" bind:value={passengers} />
    </div>
    <button on:click={calculateMileage}>Laske</button>
    {#if totalMileage > 0}
      <p class="result">Kilometrikorvaus: {totalMileage.toFixed(2)} €</p>
    {/if}
  </main>
  
  <style>
    main {
      text-align: center;
      padding: 2em;
      margin-top: 20px;
    }
  
    .input-container {
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
  </style>