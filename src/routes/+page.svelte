<script>
  import EditPost from "./EditPost.svelte";
  import FetchPosts from "./FetchPosts.svelte";
  import Nav from "../components/Nav.svelte";
  import Router, {push} from "svelte-spa-router"
  import Home from "./Home.svelte";
  import FetchUsers from "./FetchUsers.svelte";

  const routes = {
    "/": Home,
    "/posts": FetchPosts,
    "/posts/:id": EditPost,
    "/users": FetchUsers
  }


</script>

<main>
  <Nav />
  <Router {routes} />
</main>



