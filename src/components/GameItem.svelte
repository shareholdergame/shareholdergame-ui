<script>
    import { createEventDispatcher } from 'svelte';
    import PlayerNameLink from './PlayerNameLink.svelte'

    const dispatch = createEventDispatcher();

    export let gameSet = {}
</script>

<div class="card mb-1">
    <div class="card-body">
        {gameSet.options.cardOption.major}&nbsp;x&nbsp;{gameSet.options.cardOption.minor}
        {#each gameSet.games as game}
            <span class="font-weight-bold ml-2">
                {#each game.players as player}
                    <PlayerNameLink name="{player.name}"/>&nbsp;&nbsp;
                {/each}
                {#if game.status === 'FINISHED'}
                    {#each game.result as result}
                        {#if result.turnOrder > 1}
                            &nbsp;-&nbsp;
                        {/if}
                        {result.result.totalPoints}
                    {/each}
                {/if}
            </span>
            <div class="float-right">
                {#if game.status === 'RUNNING' && game.position.myTurn}
                    <span class="badge badge-danger">My turn!</span>
                {/if}
                {game.letter}
                {#if game.status === 'RUNNING'}
                    <span class="mr-2">{game.position.round}.{game.position.turn}</span>
                    <button type="button" class="btn btn-primary" id="playGame" on:click={() => dispatch('play', game)}>Play</button>
                {/if}
                {#if game.status === 'FINISHED'}
                    <button type="button" class="btn btn-info" id="viewGame" on:click={() => dispatch('view', game)}>View</button>
                {/if}
            </div>
        {/each}
    </div>
</div>
