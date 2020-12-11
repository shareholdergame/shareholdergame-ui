<script>
    import { onMount } from 'svelte';
    import {navigateTo} from 'svelte-router-spa'
    import GameItem from '../../components/GameItem.svelte'
    import {getMyGames} from "../../scripts/game";
    import {GameStatus} from "../../scripts/constants";

    export let currentRoute
    export let params = {}

    let games = []

    function refreshGamesList() {
        getMyGames('all', GameStatus.FINISHED, {offset: 0, ipp: 21}, function (gamesList) {
            console.log(JSON.stringify(gamesList))
            games = gamesList.items
        })
    }

    function showPlayGamePage(event) {
        let gameId = event.detail.id
        navigateTo('/secure/playgame/' + gameId)
    }

    onMount(() => {
        refreshGamesList()
    })
</script>

<svelte:head>
    <title>Game Stockholder - Games Archive</title>
</svelte:head>

<div class="container-fluid">
    <div class="row mb-3 mt-3">
        <div class="col">
            <h2>Games Archive</h2>
        </div>
    </div>
    <div class="row row-cols-1 row-cols-md-3">
        {#each games as game}
            <GameItem gameSet="{game}" on:view={showPlayGamePage}/>
        {/each}
    </div>
</div>
