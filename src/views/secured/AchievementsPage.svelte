<script>
    import { onMount } from 'svelte';
    import {getPlayerInfo} from "../../scripts/player";

    export let currentRoute
    export let params = {}

    let player

    function getProfileData() {
        getPlayerInfo(currentRoute.namedParams.playername, function (value) {
            player = value
        })
    }

    onMount(() => {
        getProfileData()
    })
</script>

<svelte:head>
    <title>Game Stockholder - Achievements</title>
</svelte:head>

<div class="container-fluid">
    <div class="row mb-3 mt-3">
        <div class="col">
            {#if player !== undefined}
                <h2>Achievements of {player.player.name}</h2>
            {/if}
        </div>
    </div>
</div>
