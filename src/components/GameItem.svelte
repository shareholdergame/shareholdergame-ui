<script>
    import { createEventDispatcher } from 'svelte';
    import PlayerNameLink from './PlayerNameLink.svelte'

    const dispatch = createEventDispatcher();

    export let gameSet = {}
</script>

<div class="card mb-1">
    <div class="card-body">
        {gameSet.options.cardOption.major}&nbsp;x&nbsp;{gameSet.options.cardOption.minor}
        <span class="font-weight-bold ml-2">
            {#each gameSet.players as player}
                <PlayerNameLink name="{player.player.name}"/>&nbsp;&nbsp;
            {/each}
        </span>
        {#each gameSet.games as game}
            <div class="float-right">
                {#if game.status === 'RUNNING' && game.position.myTurn}
                    <span class="badge badge-danger">My turn!</span>
                {/if}
                {game.letter}
                {#if game.status === 'RUNNING'}
                    <span class="mr-2">{game.position.round}.{game.position.turn}</span>
                    <button type="button" class="btn btn-primary" id="playGame" on:click={() => dispatch('play', game)}>Play</button>
                {/if}
            </div>
        {/each}
    </div>
</div>
