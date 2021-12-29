<script>
    import { onMount } from 'svelte';
    import {navigateTo} from 'svelte-router-spa'
    import {currentPath, reloadPage} from "../../stores";
    import GameItem from '../../components/GameItem.svelte'
    import {getMyGames} from "../../scripts/game";
    import {GameStatus} from "../../scripts/constants";
    import Paginator from "../../components/Paginator.svelte"
    import {GAME_OPTIONS} from '../../scripts/constants'

    export let currentRoute
    export let params = {}

    let total = 0
    let offset = 0
    let itemsPerPage = 21
    let games = []
    let filter = {
        userNamePrefix: '',
        cardOption: 'all'
    }

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
    <div class="row mb-3 mt-3">
        <div class="col-sm">
        </div>
        <div class="col-sm">
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-secondary active">
                    <input type="radio" name="options" id="option1" autocomplete="off" checked>All
                </label>
                {#each Object.entries(GAME_OPTIONS) as [gameOptionName, gameOption]}
                    <label class="btn btn-secondary">
                        <input type="radio" name="options" id="option2" autocomplete="off">{gameOption.title}
                    </label>
                {/each}
            </div>
        </div>
        <div class="col-sm">
            <div class="input-group w-100 d-flex">
                <label for="userNamePrefix">User name</label>
                <input type="text" id="userNamePrefix" class="form-control ml-3 flex-grow-1" bind:value={filter.userNamePrefix}
                       placeholder="Type at least 3 letters..."/>
                <button type="button" class="btn btn-primary ml-3">Search</button>
            </div>
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
