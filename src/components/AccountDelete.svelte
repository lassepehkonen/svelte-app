<script>
    import { user } from '../stores';
    import { push } from 'svelte-spa-router';
  
    const deleteUser = async () => {
      try {
        const response = await fetch('https://juhaniguru-webapischat.onrender.com/api/v1/account', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
  
        if (response.ok) {
          // Käyttäjän poisto onnistui
          localStorage.removeItem('accessToken');
          user.set({ loggedIn: false });
          push('/'); // Ohjaa käyttäjän kirjautumissivulle
        } else {
          // Käsittely epäonnistunutta käyttäjän poistoa varten
          console.error('Käyttäjän poisto epäonnistui');
        }
      } catch (error) {
        console.error('Virhe käyttäjän poiston aikana', error);
      }
    };
  </script>
  

  <main>
    <h1>Poista käyttäjätili</h1>
    <p>Oletko varma, että haluat poistaa käyttäjätilisi?</p>
    <button on:click={deleteUser} class="delete-button">Kyllä, poista</button>
  </main>
  
  <style>
    main {
      text-align: center;
      margin-top: 50px;
    }
  
    .delete-button {
      background-color: #ff555587;
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease-in-out;
    }
  
    .delete-button:hover {
      background-color: #cc0000;
    }
  </style>