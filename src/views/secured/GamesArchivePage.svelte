<script>
    import { onMount } from 'svelte';
    import {navigateTo} from 'svelte-router-spa'
    import {currentPath, reloadPage} from "../../stores";
    import GameResultItem from '../../components/GameResultItem.svelte'
    import {getGameResults} from "../../scripts/game";
    import Paginator from "../../components/Paginator.svelte"
    import UserNameFilter from "../../components/UserNameFilter.svelte"
    import OptionFilter from "../../components/OptionFilter.svelte"

    export let currentRoute
    export let params = {}

    let total = 0
    let games = []
    let parameters = {
        playerNamePrefix: '',
        offset: 0,
        ipp: 15
    }

    $: {
        if ($reloadPage) {
            refreshGamesList()
            reloadPage.set(false)
        }
    }

    const GAME_OPTION_FILTER = {
        all: "All",
        game_4x6: "4 x 6"
    }

    function refreshGamesList() {
        getGameResults('all', parameters, function (gamesList) {
            console.log(JSON.stringify(gamesList))
            total = gamesList.pagination.itemsCount
            parameters.offset = gamesList.pagination.offset
            games = gamesList.items
        })
    }

    function showPlayGamePage(event) {
        let gameId = event.detail.id
        navigateTo('/secure/playgame/' + gameId)
    }

    function onSelectPage(event) {
        parameters.offset = parseInt(event.detail.offset)
        parameters.ipp = parseInt(event.detail.ipp)
        refreshGamesList()
    }

    function onFilterByUserName(event) {
        parameters.playerNamePrefix = event.detail
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
    <div class="row mb-3 mt-3">
        <div class="col-sm-4 d-inline-flex">
            <UserNameFilter on:filterByUserName={onFilterByUserName} defaultOption="all"/>
        </div>
        <div class="col-sm-4 d-inline-flex">
            <OptionFilter options="{GAME_OPTION_FILTER}"/>
        </div>
    </div>
    <div class="row row-cols-1 row-cols-sm-3">
        {#each games as game}
            <div class="col-sm-4">
                <GameResultItem gameSet="{game}" on:view={showPlayGamePage}/>
            </div>
        {/each}
    </div>
    <div class="row justify-content-md-center">
        <Paginator itemsPerPage={parameters.ipp} totalItems={total} offset={parameters.offset} on:selectpage={onSelectPage}/>
    </div>
</div>
