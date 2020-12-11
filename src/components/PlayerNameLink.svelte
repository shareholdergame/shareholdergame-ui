<script>
    import { Navigate } from 'svelte-router-spa'

    export let name;
</script>

<Navigate to="/secure/player/{name}"><b>{name}</b></Navigate>
