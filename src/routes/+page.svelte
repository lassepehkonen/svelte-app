<script>
  import Nav from "../components/Nav.svelte";
  import Router, {push} from "svelte-spa-router"
  import Profile from "./Profile.svelte";
  import { user } from '../stores';
  import Login from "../components/Login.svelte";
  import Register from "../components/Register.svelte";
  import ChatSite from './ChatSite.svelte';
 

  const routes = {
    "/": ChatSite,
    "/profile": Profile,
  }


</script>

<main class="main-container">
  <Nav />

{#if $user.loggedIn}
  <Router {routes} />

{:else}

<div class="form-container">
  <div class="form-column">
    <Login />
  </div>
  <div class="form-column">
    <Register />
  </div>
</div>
{/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
  }

  .main-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .form-container {
    display: flex;
    justify-content: space-between;
    max-width: 900px;
  }

  .form-column {
    flex: 1;
    margin: 40px;
  }

</style>



