<script>
    let users = [];
    let selectedFields = {
      name: true,
      username: true,
      email: true,
      address: true,
      phone: true,
      website: true,
    };
  
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        users = await response.json();
      } catch (error) {
        console.error('Virhe käyttäjätietojen hakemisessa:', error);
      }
    };
    
    fetchUsers();
  </script>
  

  <main>
    <h1>Käyttäjät</h1>
    <div class="checkbox-container">
      <div class="checkbox-label">
        <label for="nameCheckbox">Nimi</label>
        <input type="checkbox" id="nameCheckbox" bind:checked={selectedFields.name} />
      </div>
      <div class="checkbox-label">
        <label for="usernameCheckbox">Käyttäjänimi</label>
        <input type="checkbox" id="usernameCheckbox" bind:checked={selectedFields.username} />
      </div>
      <div class="checkbox-label">
        <label for="emailCheckbox">Sähköposti</label>
        <input type="checkbox" id="emailCheckbox" bind:checked={selectedFields.email} />
      </div>
      <div class="checkbox-label">
        <label for="addressCheckbox">Osoite</label>
        <input type="checkbox" id="addressCheckbox" bind:checked={selectedFields.address} />
      </div>
      <div class="checkbox-label">
        <label for="phoneCheckbox">Puhelin</label>
        <input type="checkbox" id="phoneCheckbox" bind:checked={selectedFields.phone} />
      </div>
      <div class="checkbox-label">
        <label for="websiteCheckbox">Verkkosivusto</label>
        <input type="checkbox" id="websiteCheckbox" bind:checked={selectedFields.website} />
      </div>
    </div>
    <table>
      <thead>
        <tr>
          {#if selectedFields.name}
            <th>Nimi</th>
          {/if}
          {#if selectedFields.username}
            <th>Käyttäjänimi</th>
          {/if}
          {#if selectedFields.email}
            <th>Sähköposti</th>
          {/if}
          {#if selectedFields.address}
            <th>Osoite</th>
          {/if}
          {#if selectedFields.phone}
            <th>Puhelin</th>
          {/if}
          {#if selectedFields.website}
            <th>Verkkosivusto</th>
          {/if}
        </tr>
      </thead>
      <tbody>
        {#each users as user}
          <tr>
            {#if selectedFields.name}
              <td>{user.name}</td>
            {/if}
            {#if selectedFields.username}
              <td>{user.username}</td>
            {/if}
            {#if selectedFields.email}
              <td>{user.email}</td>
            {/if}
            {#if selectedFields.address}
              <td>{user.address.street}, {user.address.city}</td>
            {/if}
            {#if selectedFields.phone}
              <td>{user.phone}</td>
            {/if}
            {#if selectedFields.website}
              <td><a href={user.website} target="_blank">{user.website}</a></td>
            {/if}
          </tr>
        {/each}
      </tbody>
    </table>
  </main>

  <style>
    main {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      margin-top: 3%;
    }
  
    h1 {
      color: #007bff;
    }
  
    div {
      margin: 10px 0;
    }
  
    label {
      display: inline-block;
      width: 150px;
    }
  
    input[type="checkbox"] {
      margin-right: 5px;
    }
  
    table {
      width: 100%;
      border-collapse: collapse;
    }
  
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
    }
  
    th {
      background-color: #f2f2f2;
    }
  
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    .checkbox-label {
    margin-right: 10px;
  }

  .checkbox-container {
    display: flex;
    align-items: center;
  }
  </style>