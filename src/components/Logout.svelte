<script>
    import { user } from '../stores';
    import { push } from 'svelte-spa-router';
  
    const logout = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
  
        if (accessToken) {
          const response = await fetch('https://juhaniguru-webapischat.onrender.com/api/v1/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
          });
  
          if (response.ok) {
            // Poista accessToken localStoragesta
            localStorage.removeItem('accessToken');
  
            // Aseta kirjautumistila epätodeksi
            user.set({ loggedIn: false });
  
            // Ohjaa käyttäjä uloskirjautumisen jälkeen
            push('/');
          } else {
            console.error('Uloskirjautuminen epäonnistui');
          }
        } else {
          console.warn('AccessTokenia ei löytynyt localStoragesta');
        }
      } catch (error) {
        console.error('Virhe uloskirjautumisen aikana', error);
      }
    };
  </script>
  
  <main class="logout-container">
    <button class="logout-button" on:click={logout}>Kirjaudu ulos</button>
  </main>

  <style>
    .logout-container {
      text-align: right;
    }
  
    .logout-button {
      background-color: #43484e75;
      color: #ffffffbf;
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
    }
  
    .logout-button:hover {
      background-color: #404549;
      color: #1f7a34bf;
    }
  </style>
