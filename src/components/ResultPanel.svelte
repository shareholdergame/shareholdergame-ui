<script>
    import {createEventDispatcher} from 'svelte';
    import PlayerNameLink from './PlayerNameLink.svelte'

    const dispatch = createEventDispatcher();

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
                            <button id="gameReportBtn" type="button" class="btn btn-link" on:click={dispatch('gamereport', game.id)}>Game {game.letter}</button>
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
                <button type="button" class="btn btn-link btn-lg" on:click={dispatch('gamereport', game.id)}>Game {game.letter}</button>
            {/if}
        {/each}
    {/if}
</div>
