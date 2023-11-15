<script>
  import { push } from "svelte-spa-router"

  let username = '';
  let password = '';
  let room = 'syksy2003webapit';
  let errorMessage = null;

  const register = async () => {
    try {
      const response = await fetch('https://juhaniguru-webapischat.onrender.com/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          room,
        }),
      });

      if (response.ok) {
        // Rekisteröityminen onnistui, voit ohjata käyttäjän kirjautumissivulle tai tehdä jotain muuta
        push('/');
      } else {
        // Käsittely epäonnistunutta rekisteröitymistä varten
        console.error('Rekisteröityminen epäonnistui');
        const data = await response.json();
        errorMessage = data.error || 'Rekisteröityminen epäonnistui';
      }
    } catch (error) {
      console.error('Virhe rekisteröinnin aikana', error);
      errorMessage = 'Virhe rekisteröinnin aikana';
    }
  };
</script>

<main>
<div class="register-container">
  <h1>Rekisteröidy</h1>
  {#if errorMessage}
    <p class="error-message">{errorMessage}</p>
  {/if}
  <form on:submit|preventDefault={register}>
    <label for="username">Käyttäjätunnus:</label>
    <input type="text" id="username" bind:value={username} />

    <label for="password">Salasana:</label>
    <input type="password" id="password" bind:value={password} />

    <label for="room">Salasana:</label>
    <input type="room" id="room" bind:value={room} />

    <button type="submit">Rekisteröidy</button>
  </form>
</div>
</main>

<style>
    main {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
  
    .register-container {
      width: 300px;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      background-color: #fff;
      height: 35%;
    }
  
    h1 {
      font-size: 24px;
      margin-bottom: 20px;
      text-align: center;
    }
  
    form {
      display: flex;
      flex-direction: column;
    }
  
    label {
      margin-bottom: 8px;
    }
  
    input {
      padding: 8px;
      margin-bottom: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  
    .error-message {
      color: red;
      margin-bottom: 16px;
    }
  
    button {
    background-color: #28a746b9;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease-in-out;
  }

  button:hover {
    background-color: #218838;
  }
  </style>


