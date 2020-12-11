<script>
    export let players = []
    export let options = {}
    export let games = []
</script>

<div class="row pt-4 pb-4">
    <div class="col">
        <h2>
            {#if players.length > 0}
                {#each players as player}
                    {player.player.name} -
                {/each}
            {/if}
            {#if options !== undefined && options.cardOption !== undefined}
                {options.cardOption.major}&nbsp;x&nbsp;{options.cardOption.minor}
            {/if}
            {#if games.length > 0}
                Game {games[0].letter}
            {/if}
        </h2>
    </div>
</div>
