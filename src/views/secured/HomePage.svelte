<script>
    import { onMount } from 'svelte';
    import {navigateTo} from 'svelte-router-spa'
    import {currentPath} from "../../stores";
    import {getMyGames, performInvitationStatusChange} from '../../scripts/game';
    import {GameStatus, InvitationAction} from '../../scripts/constants'
    import InvitationItem from '../../components/InvitationItem.svelte'
    import GameItem from '../../components/GameItem.svelte'

    export let currentRoute
    export let params = {}

    let games = []
    let invitations = []

    function refreshGamesList() {
        getMyGames('all', GameStatus.RUNNING, {offset: 0, ipp: 20}, function (gamesList) {
            games = gamesList.items
        })
        getMyGames('all', GameStatus.CREATED, {offset: 0, ipp: 20}, function (gamesList) {
            invitations = gamesList.items
        })
    }

    function showPlayGamePage(event) {
        let gameId = event.detail.id
        navigateTo('/secure/playgame/' + gameId)
    }

    function acceptInvitation(event) {
        performInvitationStatusChange(event.detail.id, InvitationAction.ACCEPT, refreshGamesList)
    }

    function rejectInvitation(event) {
        performInvitationStatusChange(event.detail.id, InvitationAction.REJECT, refreshGamesList)
    }

    function cancelInvitation(event) {
        performInvitationStatusChange(event.detail.id, InvitationAction.CANCEL, refreshGamesList)
    }

    function onStartNewGame(event) {
        navigateTo('/secure/newgame')
    }

    onMount(() => {
        currentPath.set(currentRoute.path)
        refreshGamesList()
    })
</script>

<svelte:head>
    <title>Game Stockholder - Home</title>
</svelte:head>

<div class="container-fluid">
    <div class="row justify-content-md-center pt-4 pb-4">
        <div class="col-4">
            <button type="button" class="btn btn-primary btn-lg btn-block" on:click={onStartNewGame}>Start New Game</button>
        </div>
    </div>
    <div class="row">
        <div class="col-sm">
            <h4>Invitations</h4>
            {#each invitations as invitation}
                <InvitationItem game="{invitation}" on:accept={acceptInvitation} on:reject={rejectInvitation}
                                on:cancel={cancelInvitation}/>
            {/each}
        </div>
        <div class="col-sm">
            <h4>Active games</h4>
            {#each games as game}
                <GameItem gameSet="{game}" on:play={showPlayGamePage}/>
            {/each}
        </div>
        <div class="col-sm">
            <h4>Now playing</h4>
        </div>
    </div>
</div>