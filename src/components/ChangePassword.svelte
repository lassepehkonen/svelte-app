<script>
    import { user } from '../stores';
    import { push } from 'svelte-spa-router';
  
    let newPassword = '';
    let confirmPassword = '';
    let errorMessage = null;
  
    const changePassword = async () => {
      try {
        // Tarkista, että uusi salasana ja vahvistus ovat samat
        if (newPassword !== confirmPassword) {
          errorMessage = 'Uusi salasana ja vahvistus eivät ole samat.';
          return;
        }
  
        const response = await fetch('https://juhaniguru-webapischat.onrender.com/api/v1/account/password', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: JSON.stringify({
            password: newPassword,
          }),
        });
  
        if (response.ok) {
          // Salasanan vaihto onnistui, voit ohjata käyttäjän profiilisivulle tai tehdä jotain muuta
          push('/profile');
          newPassword = ''
          confirmPassword = ''
          console.log('Salasanan vaihto onnistui')
        } else {
          // Käsittely epäonnistunutta salasanan vaihtoa varten
          const data = await response.json();
          errorMessage = data.error || 'Salasanan vaihto epäonnistui.';
        }
      } catch (error) {
        console.error('Virhe salasanan vaihdon aikana', error);
      }
    };
  </script>
  
  <main>
    <h1>Vaihda salasana</h1>
    {#if errorMessage}
      <p style="color: red;">{errorMessage}</p>
    {/if}
    <form on:submit|preventDefault={changePassword} class="password-form">
      <label for="newPassword">Uusi salasana:</label>
      <input type="password" id="newPassword" bind:value={newPassword} />
  
      <label for="confirmPassword">Vahvista salasana:</label>
      <input type="password" id="confirmPassword" bind:value={confirmPassword} />
  
      <button type="submit">Vaihda salasana</button>
    </form>
  </main>
  
  <style>
    main {
      text-align: center;
      margin-top: 50px;
      margin-bottom: 20px;
    }
  
    .password-form {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  
    label {
      margin-top: 10px;
    }
  
    input {
      padding: 8px;
      margin-top: 5px;
      border-radius: 5px;
      border: 1px solid #ddd;
      width: 200px;
    }
  
    button {
      background-color: #4caf50; /* vihreä väri */
      color: #fff; /* valkoinen teksti */
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease-in-out;
      margin-top: 15px;
    }
  
    button:hover {
      background-color: #45a049; /* tummempi vihreä hoverissa */
    }
  </style>