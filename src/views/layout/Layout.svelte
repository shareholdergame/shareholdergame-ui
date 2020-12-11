<script>
    import { Route } from "svelte-router-spa";
    export let currentRoute;
    export let params = {}
</script>

<div>
    <Route {currentRoute} {params} />
</div>
