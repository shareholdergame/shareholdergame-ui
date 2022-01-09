<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let userNamePrefix = ''

    function onSearchPlayerClick() {
        dispatch('filterByUserName', userNamePrefix)
    }
</script>

<div class="input-group w-100 d-flex">
    <label for="userNamePrefix">User name</label>
    <input type="text" id="userNamePrefix" class="form-control ml-3 flex-grow-1" bind:value={userNamePrefix}
           placeholder="Type at least 3 letters..."/>
    <button type="submit" class="btn btn-primary ml-3" on:click={onSearchPlayerClick}>Search</button>
</div>
