<script>
     import { push} from "svelte-spa-router"
     import { params } from '../stores';

    let posts = [];
    let loading = false;


    async function fetchPosts() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        posts = await response.json();
      } catch (error) {
        console.error('Error from fetching posts:', error);
      } finally {
        loading = false;
        }
    }


    function editPost(id) {
    params.set(id);
    push(`/posts/${id}`);
  }
    
</script>

<main class="fetch-posts">
    <button on:click={fetchPosts} disabled={loading}>
      {#if loading}
        Lataa...
      {:else}
        Hae Postaukset
      {/if}
    </button>
  
    {#if posts.length > 0}
      <table class="post-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Otsikko</th>
            <th>Teksti</th>
          </tr>
        </thead>
        <tbody>
            {#each posts as post (post.id)}
            <tr on:click={() => editPost(post.id)}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </main>
  
  <style>
    main {
          text-align: center;
          padding: 2em;
          margin-top: 3%;
        }
        
    .fetch-posts {
      text-align: center;
      padding: 2em;
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
  
    button[disabled] {
      background-color: #ccc;
      cursor: not-allowed;
    }
  
    .post-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  
    .post-table th, .post-table td {
      border: 1px solid #ccc;
      padding: 12px;
    }
  
    .post-table th {
      background-color: #f0f0f0;
    }
  </style>