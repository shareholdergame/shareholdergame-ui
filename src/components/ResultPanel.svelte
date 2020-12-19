<script>
    import { Navigate } from 'svelte-router-spa'
    import PlayerNameLink from './PlayerNameLink.svelte'

    export let gameSet
</script>

<div class="d-flex flex-row">
    {#if gameSet !== undefined}
        <table class="mr-3 bg-light">
            <tr>
                <th class="text-center" colspan="2">Game Set Result</th>
            </tr>
            <tr>
                {#each gameSet.result as result}
                    <td class="text-center px-3">
                        <PlayerNameLink name="{result.name}"/>
                    </td>
                {/each}
            </tr>
            <tr>
                {#each gameSet.result as result}
                    <td class="text-center px-3">
                        <b>{result.totalPoints}</b>&nbsp;-&nbsp;{result.totalFunds}
                        {#if result.fundsDifference > 0}
                            <span class="badge badge-success">+{result.fundsDifference}</span>
                        {/if}
                    </td>
                {/each}
            </tr>
        </table>

        {#each gameSet.games as game}
            {#if game.result !== null}
                <table class="mr-3 bg-light">
                    <tr>
                        <th class="text-center" colspan="2">
                            <Navigate to="/secure/playgame/{game.id}">Game {game.letter}</Navigate>
                        </th>
                    </tr>
                    <tr>
                        {#each game.result as result}
                            <td class="text-center bgcolor-turn-{result.turnOrder} px-3">
                                <PlayerNameLink name="{result.result.name}"/>
                            </td>
                        {/each}
                    </tr>
                    <tr>
                        {#each game.result as result}
                            <td class="text-center bgcolor-turn-{result.turnOrder} px-3">
                                <b>{result.result.totalPoints}</b>&nbsp;-&nbsp;{result.result.totalFunds}
                                {#if result.result.fundsDifference > 0}
                                    <span class="badge badge-success">+{result.result.fundsDifference}</span>
                                {/if}
                            </td>
                        {/each}
                    </tr>
                </table>
            {:else}
                <Navigate to="/secure/playgame/{game.id}"><h2>Game {game.letter}</h2></Navigate>
            {/if}
        {/each}
    {/if}
</div>
