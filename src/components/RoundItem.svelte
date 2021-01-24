<script>
    import TurnItem from './TurnItem.svelte'

    export let round = {}
</script>

{#if round !== undefined && round.turns !== undefined}
    {#each round.turns as turn}
        <div class="row border-bottom">
            <div class="col-sm-1 text-center color-turn-{turn.turn} bgcolor-turn-{turn.turn}  px-0">
                <strong>{turn.round}.{turn.turn}</strong>
            </div>
            <TurnItem turn="{turn}"/>
        </div>
    {/each}
{/if}
