<script>
    export let options = {}
    export let game = {}
</script>

<h2>
    {#if game.players !== undefined && game.players.length > 0}
        {#each game.players as player}
            {player.name} -
        {/each}
    {/if}
    {#if options.cardOption !== undefined}
        {options.cardOption.major}&nbsp;x&nbsp;{options.cardOption.minor}
    {/if}
    <br/>
    Game {game.letter}
</h2>
