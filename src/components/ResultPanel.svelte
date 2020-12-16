<script>
    import PlayerNameLink from './PlayerNameLink.svelte'

    export let gameSet
</script>

{#if gameSet !== undefined}
    <table class="table mb-0">
        <tr>
            <th class="text-center" colspan="2">Game Set Result</th>
            {#each gameSet.games as game}
                <th class="text-center" colspan="2">Game {game.letter}</th>
            {/each}
        </tr>
        <tr>
            {#each gameSet.result as result}
                <td class="text-center">
                    <PlayerNameLink name="{result.name}"/>
                </td>
            {/each}
            {#each gameSet.games as game}
                {#each game.result as result}
                    <td class="text-center bgcolor-turn-{result.turnOrder}">
                        <PlayerNameLink name="{result.result.name}"/>
                    </td>
                {/each}
            {/each}
        </tr>
        <tr>
            {#each gameSet.result as result}
                <td class="text-center">
                    <b>{result.totalPoints}</b>&nbsp;-&nbsp;{result.totalFunds}
                    {#if result.fundsDifference > 0}
                        <span class="badge badge-success">+{result.fundsDifference}</span>
                    {/if}
                </td>
            {/each}
            {#each gameSet.games as game}
                {#each game.result as result}
                    <td class="text-center bgcolor-turn-{result.turnOrder}">
                        <b>{result.result.totalPoints}</b>&nbsp;-&nbsp;{result.result.totalFunds}
                        {#if result.result.fundsDifference > 0}
                            <span class="badge badge-success">+{result.result.fundsDifference}</span>
                        {/if}
                    </td>
                {/each}
            {/each}
        </tr>
    </table>
{/if}
