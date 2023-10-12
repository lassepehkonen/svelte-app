<script>
    import { onMount } from 'svelte';
    import { push } from 'svelte-spa-router';
    import { params } from '../stores';

  let post = null;

  onMount(async () => {

    const postId = $params;
    console.log(postId); 

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      post = await response.json();
    } catch (error) {
      console.error('Virhe postauksen hakemisessa:', error);
      push('/#/posts');
    }
  });
    
    async function saveChanges() {
      try {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
          method: 'PUT',
          body: JSON.stringify(post),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });


        console.log('Onnistui!')
        push('/posts'); 
      } catch (error) {
        console.error('Virhe tallennettaessa muutoksia:', error);
      }
    }
  </script>
  
  <main class="edit-post">
    <h1>Muokkaa Postausta</h1>
    {#if post}
      <div class="post-details">
        <label for="title">Otsikko:</label>
        <input type="text" id="title" bind:value={post.title} />
  
        <label for="body">Teksti:</label>
        <textarea id="body" bind:value={post.body}></textarea>
  
        <button on:click={saveChanges}>Tallenna Muutokset</button>
      </div>
    {:else}
      <p>Ladataan...</p>
    {/if}
  </main>
  
  <style>
      main {
      text-align: center;
      padding: 2em;
    }
    
    .edit-post {
      text-align: center;
      padding: 2em;
    }
  
    .post-details {
      max-width: 400px;
      margin: 0 auto;
      text-align: left;
    }
  
    label {
      display: block;
      margin-bottom: 5px;
    }
  
    input, textarea {
      width: 100%;
      padding: 5px;
      margin-bottom: 15px;
    }
  
    button {
      background-color: #007bff;
      color: white;
      padding: 10px 20px;
      font-size: 16px;
      border: none;
      cursor: pointer;
      border-radius: 5px;
    }
  
    button:hover {
      background-color: #0056b3;
    }
  </style>