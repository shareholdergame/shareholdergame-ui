<script>
    import { onMount } from 'svelte';
    import {navigateTo} from 'svelte-router-spa'
    import { searchPlayer } from '../../../scripts/player';
    import { startNewGame } from '../../../scripts/game';
    import { GAME_OPTIONS } from '../../../scripts/constants'
    import InvitePlayerItem from '../../../components/InvitePlayerItem.svelte'
    import Paginator from "../../../components/Paginator.svelte"

    export let currentRoute
    export let params = {}

    let total = 0
    let offset = 0
    let itemsPerPage = 21
    let players = []
    let userNamePrefix = ''

    const searchUserCallback = function(responseBody) {
        total = responseBody.pagination.itemsCount
        offset = responseBody.pagination.offset
        players = responseBody.players
    }

    function selectPlayer(event) {
        let selectedUser = event.detail
        startNewGame(currentRoute.namedParams.gameoption, [selectedUser], function (gameId) {
            navigateTo("/secure/home")
        })
    }

    function onSelectPage(event) {
        offset = parseInt(event.detail.offset)
        itemsPerPage = parseInt(event.detail.ipp)
        searchPlayer({name: userNamePrefix, offset: offset, ipp: itemsPerPage}, searchUserCallback)
    }

    function onSearchPlayerClick() {
        searchPlayer({name: userNamePrefix, offset: offset, ipp: itemsPerPage}, searchUserCallback)
    }

    function onPlayWithComputer(event) {
        startNewGame(currentRoute.namedParams.gameoption, null, function (gameId) {
            navigateTo("/secure/playgame/" + gameId)
        })
    }

    onMount(() => { searchPlayer({name: '', offset: offset, ipp: itemsPerPage}, searchUserCallback)})
</script>

<svelte:head>
    <title>Game Stockholder - Invite User</title>
</svelte:head>

<div class="container-fluid">
    <div class="row mb-3 mt-3">
        <div class="col d-inline-flex border-bottom">
            <h2>Selected Game Option: {GAME_OPTIONS[currentRoute.namedParams.gameoption].title}</h2>
            <a href="/secure/newgame/" class="btn btn-link">Select another option</a>
        </div>
    </div>
    <div class="row mb-3">
        <div class="col-sm-4 d-inline-flex">
            <h4>Select user to play</h4>
            <div class="flex-grow-1">
                <h4 class="text-center">&#45;&#45; OR &#45;&#45;</h4>
            </div>
        </div>
        <div class="col-sm-4">
            <button type="button" class="btn btn-secondary" on:click={onPlayWithComputer}>Play With Computer</button>
        </div>
        <div class="col-sm-4 d-inline-flex">
            <div class="input-group w-100 d-flex">
                <label for="userNamePrefix">User name</label>
                <input type="text" id="userNamePrefix" class="form-control ml-3 flex-grow-1" bind:value={userNamePrefix}
                       placeholder="Type at least 3 letters..."/>
                <button type="submit" class="btn btn-primary ml-3" on:click={onSearchPlayerClick}>Search</button>
            </div>
        </div>
    </div>
    <div class="row row-cols-1 row-cols-sm-3">
        {#each players as player}
            <div class="col-sm-4">
                <InvitePlayerItem player={player} on:selectuser={selectPlayer}/>
            </div>
        {/each}
    </div>
    <div class="row justify-content-md-center">
        <Paginator itemsPerPage={itemsPerPage} totalItems={total} offset={offset} on:selectpage={onSelectPage}/>
    </div>
</div>
