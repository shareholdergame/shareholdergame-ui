<script>
    import { onMount } from 'svelte';
    import {getProfile} from "../../scripts/profile";

    export let currentRoute
    export let params = {}

    let profile

    function getProfileData() {
        getProfile(function (value) {
            profile = value
        })
    }

    onMount(() => {
        getProfileData()
    })
</script>

<div class="container-fluid">
    <div class="row mb-3 mt-3">
        <div class="col">
            {#if profile !== undefined}
                <h2>{profile.playerWithLocation.player.name}</h2>
            {/if}
        </div>
    </div>
</div>
