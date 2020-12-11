<script>
    import { onMount } from 'svelte';
    import {navigateTo} from 'svelte-router-spa'
    import { getMyGames, performInvitationStatusChange } from '../../scripts/game';
    import InvitationItem from '../../components/InvitationItem.svelte'
    import GameItem from '../../components/GameItem.svelte'
    import { InvitationAction, GameStatus } from '../../scripts/constants'

    export let currentRoute
    export let params = {}

    let selectedGameOption = 'game_4x6'
    let invitations = []
    let games = []

    function refreshGamesList() {
        getMyGames(selectedGameOption, GameStatus.CREATED, undefined, function (gamesList) {
            invitations = gamesList.items
        })
        getMyGames(selectedGameOption, GameStatus.RUNNING, undefined, function (gamesList) {
            games = gamesList.items
        })
    }

    onMount(() => {
        refreshGamesList();
    })

    function acceptInvitation(event) {
        performInvitationStatusChange(event.detail.id, InvitationAction.ACCEPT, refreshGamesList)
    }

    function rejectInvitation(event) {
        performInvitationStatusChange(event.detail.id, InvitationAction.REJECT, refreshGamesList)
    }

    function cancelInvitation(event) {
        performInvitationStatusChange(event.detail.id, InvitationAction.CANCEL, refreshGamesList)
    }

    function showPlayGamePage(event) {
        let gameId = event.detail.id
        navigateTo('/secure/playgame/' + gameId)
    }
</script>

<h1>My Games</h1>
<div class="row">
    <div class="col">
        {#each invitations as invitation}
            <InvitationItem game="{invitation}" on:accept={acceptInvitation} on:reject={rejectInvitation}
                            on:cancel={cancelInvitation}/>
        {/each}
    </div>
    <div class="col">
        {#each games as game}
            <GameItem gameSet="{game}" on:play={showPlayGamePage}/>
        {/each}
    </div>
</div>

