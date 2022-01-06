<script>
    import { createEventDispatcher } from 'svelte';
    import PlayerNameLink from './PlayerNameLink.svelte'

    const dispatch = createEventDispatcher();

    export let gameSet = {}
</script>

<div class="card mb-1">
    <div class="card-body d-flex flex-row">
        <div class="flex-column text-center">
            <b>{gameSet.options.cardOption.major}&nbsp;x&nbsp;{gameSet.options.cardOption.minor}</b>
            <small>
                {gameSet.finishedTime}
            </small>
        </div>
        <table class="table table-borderless table-sm">
            <tr>
                {#each gameSet.result as result}
                    <td class="text-center">
                        <span class="font-weight-bold ml-2">
                            <PlayerNameLink name="{result.name}"/>
                        </span>
                    </td>
                {/each}
            </tr>
            <tr>
                {#each gameSet.result as result}
                    <td class="text-center">
                        <span class="font-weight-bold ml-2">
                            {result.totalPoints}
                            {#if result.totalPoints > 0 && result.fundsDifference > 0}
                                <span class="badge badge-success">+{result.fundsDifference}</span>
                            {/if}
                        </span>
                    </td>
                {/each}
            </tr>
        </table>
        <div class="float-right">
            <button type="button" class="btn btn-info" id="viewGame" on:click={() => dispatch('view', gameSet.games[0])}>View</button>
        </div>
    </div>
</div>
