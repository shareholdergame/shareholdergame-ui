<script>
    import { StepType } from '../scripts/constants'
    import BuySellStepItem from '../components/BuySellStepItem.svelte'
    import PriceChangeStepItem from '../components/PriceChangeStepItem.svelte'

    export let turn = {}
</script>

{#if turn !== undefined && turn.steps !== undefined}
    {#if turn.round === 0}
        <div class="col-sm-3 color-turn-{turn.turn} bgcolor-turn-{turn.turn}">
            <BuySellStepItem step="{turn.steps[StepType.ZERO_STEP]}"/>
        </div>
        <div class="col-sm-4 color-turn-{turn.turn} bgcolor-turn-{turn.turn}">
            {#if turn.steps[StepType.ZERO_STEP].sharePrices !== undefined}
                <PriceChangeStepItem cardId={turn.cardId} step="{turn.steps[StepType.ZERO_STEP]}"/>
            {/if}
        </div>
        <div class="col-sm-3 mr-1"></div>
        <div class="col-sm-1"></div>
    {:else}
        <div class="col-sm-3 color-turn-{turn.turn} bgcolor-turn-{turn.turn}">
            <BuySellStepItem step="{turn.steps[StepType.FIRST_BUY_SELL_STEP]}"/>
        </div>
        <div class="col-sm-4 color-turn-{turn.turn} bgcolor-turn-{turn.turn}">
            <PriceChangeStepItem cardId={turn.cardId} step="{turn.steps[StepType.PRICE_CHANGE_STEP]}"/>
        </div>
        <div class="col-sm-3 color-turn-{turn.turn} bgcolor-turn-{turn.turn}">
            <BuySellStepItem step="{turn.steps[StepType.LAST_BUY_SELL_STEP]}"/>
        </div>
        <div class="col-sm-1 color-turn-{turn.turn} bgcolor-turn-{turn.turn}">
        </div>
    {/if}
{/if}
