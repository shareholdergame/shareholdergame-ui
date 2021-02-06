<script>
    import { onMount } from 'svelte';
    import {navigateTo} from 'svelte-router-spa'
    import {currentPath, reloadPage} from "../../stores";
    import GameItem from '../../components/GameItem.svelte'
    import {getMyGames} from "../../scripts/game";
    import {GameStatus} from "../../scripts/constants";
    import Paginator from "../../components/Paginator.svelte"

    export let currentRoute
    export let params = {}

    let total = 0
    let offset = 0
    let itemsPerPage = 21
    let games = []

    $: {
        if ($reloadPage) {
            refreshGamesList()
            reloadPage.set(false)
        }
    }

    function refreshGamesList() {
        getMyGames('all', GameStatus.FINISHED, {offset: offset, ipp: itemsPerPage}, function (gamesList) {
            console.log(JSON.stringify(gamesList))
            total = gamesList.pagination.itemsCount
            offset = gamesList.pagination.offset
            games = gamesList.items
        })
    }

    function showPlayGamePage(event) {
        let gameId = event.detail.id
        navigateTo('/secure/playgame/' + gameId)
    }

    function onSelectPage(event) {
        offset = parseInt(event.detail.offset)
        itemsPerPage = parseInt(event.detail.ipp)
        refreshGamesList()
    }

    onMount(() => {
        currentPath.set(currentRoute.path)
        refreshGamesList()
    })
</script>

<svelte:head>
    <title>Game Stockholder - Games Archive</title>
</svelte:head>

<div class="container-fluid">
    <div class="row mb-3 mt-3">
        <div class="col-sm">
            <h2>Games Archive</h2>
        </div>
    </div>
    <div class="row row-cols-1 row-cols-sm-3">
        {#each games as game}
            <div class="col-sm-4">
                <GameItem gameSet="{game}" on:view={showPlayGamePage}/>
            </div>
        {/each}
    </div>
    <div class="row justify-content-md-center">
        <Paginator itemsPerPage={itemsPerPage} totalItems={total} offset={offset} on:selectpage={onSelectPage}/>
    </div>
</div>
