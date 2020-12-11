<script>
    import { createEventDispatcher } from 'svelte';
    import { InvitationStatus } from '../scripts/constants'
    import {isMe} from '../auth.js';
    import PlayerNameLink from './PlayerNameLink.svelte'

    const dispatch = createEventDispatcher();

    export let game = {}

    function canAcceptOrReject(game) {
        for (const player of game.players) {
            if (isMe(player.player.name)
                    && player.invitation != null && player.invitation.invitationStatus === InvitationStatus.PENDING) {
                return true;
            }
        }
        return false;
    }

    function canCancel(game) {
        for (const player of game.players) {
            if (isMe(player.player.name) && player.initiator) {
                return true;
            }
        }
        return false;
    }
</script>

<div class="card mb-1">
    <div class="card-body">
        {game.options.cardOption.major}&nbsp;x&nbsp;{game.options.cardOption.minor}
        <span class="font-weight-bold ml-2">
            {#each game.players as player}
                <PlayerNameLink name="{player.player.name}"/>&nbsp;&nbsp;
            {/each}
        </span>
        {#if canAcceptOrReject(game) }
            <div class="float-right">
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-success" id="acceptInvitation" on:click={() => dispatch('accept', game)}>Accept</button>
                    <button type="button" class="btn btn-danger" id="rejectInvitation" on:click={() => dispatch('reject', game)}>Reject</button>
                </div>
            </div>
        {/if}
        {#if canCancel(game) }
            <div class="float-right">
                <button type="button" class="btn btn-dark" id="cancelInvitation" on:click={() => dispatch('cancel', game)}>Cancel</button>
            </div>
        {/if}
    </div>
</div>