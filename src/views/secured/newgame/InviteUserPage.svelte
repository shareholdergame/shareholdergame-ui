<script>
    import { onMount } from 'svelte';
    import {navigateTo} from 'svelte-router-spa'
    import { searchPlayer } from '../../../scripts/player';
    import { startNewGame } from '../../../scripts/game';
    import { GAME_OPTIONS } from '../../../scripts/constants'
    import InvitePlayerItem from '../../../components/InvitePlayerItem.svelte'

    export let currentRoute
    export let params = {}

    let players = []
    let pagination = []
    let userNamePrefix = ''

    const searchUserCallback = function(responseBody) {
        pagination = responseBody.pagination
        players = responseBody.players
    }

    onMount(() => { searchPlayer('', null, searchUserCallback)})

    function searchUser() {
        searchPlayer(userNamePrefix, null, searchUserCallback)
    }

    function selectUser(event) {
        let selectedUser = event.detail
        startNewGame(currentRoute.namedParams.gameoption, [selectedUser], function (gameId) {
            navigateTo("/secure/home")
        })
    }
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
        <div class="col-4 d-inline-flex">
            <h4>Select user to play</h4>
            <div class="flex-grow-1">
                <h4 class="text-center">-- OR --</h4>
            </div>
            <button type="button" class="btn btn-secondary">Play With Computer</button>
        </div>
        <div class="col-4">
        </div>
        <div class="col-4 d-inline-flex">
            <div class="input-group w-100 d-flex">
                <label for="userNamePrefix">User name</label>
                <input type="text" id="userNamePrefix" class="form-control ml-3 flex-grow-1" bind:value={userNamePrefix}
                       placeholder="Type at least 3 letters..."/>
                <button type="submit" class="btn btn-primary ml-3" on:click={searchUser}>Search</button>
            </div>
        </div>
    </div>
    <div class="row row-cols-1 row-cols-md-3">
        {#each players as player}
            <div class="col-4">
                <InvitePlayerItem player={player} on:selectuser={selectUser}/>
            </div>
        {/each}
    </div>
</div>
