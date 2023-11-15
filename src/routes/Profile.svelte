<script>
  import AccountDelete from "../components/AccountDelete.svelte";
import ChangePassword from "../components/ChangePassword.svelte";


</script>

<main>
    <div class="profile-container">
    <ChangePassword />
    </div>

<div class="danger-zone">
    <h1>Dangerzone!</h1>
    <AccountDelete />
</div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .profile-container {
    margin-bottom: 20px;
    margin-top: 5%;
  }

  .danger-zone {
    margin-top: 20%;
    text-align: center;
    border: 2px solid #ff5555;
    border-radius: 10px;
    padding: 10px;
  }

  h1 {
    font-weight: bold;
    color: #ff5555;
  }
</style>