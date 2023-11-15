<script>
    import { user } from '../stores';
    import { push} from "svelte-spa-router"
  
    let username = '';
    let password = '';
  
    const login = async () => {
      try {
        const response = await fetch('https://juhaniguru-webapischat.onrender.com/api/v1/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          const accessToken = data.token;
          localStorage.setItem('accessToken', accessToken);
          user.set({ loggedIn: true, userName: username });
          push('/'); // Ohjaa käyttäjä eteenpäin sisäänkirjautumisen jälkeen
        } else {
          // Käsittely epäonnistunutta sisäänkirjautumista varten
          console.error('Sisäänkirjautuminen epäonnistui');
        }
      } catch (error) {
        console.error('Virhe kirjautumisen aikana', error);
      }
    };
  </script>
  
  <main>
    <div class="login-container">
    <h1>Kirjaudu sisään</h1>
    <form on:submit|preventDefault={login}>
      <label for="username">Käyttäjänimi:</label>
      <input type="text" id="username" bind:value={username} />
  
      <label for="password">Salasana:</label>
      <input type="password" id="password" bind:value={password} />
  
      <button type="submit">Kirjaudu</button>

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
  
    .login-container {
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