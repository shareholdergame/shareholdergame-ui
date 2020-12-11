<script>
    import { createEventDispatcher } from 'svelte';
    import {StepType} from "../scripts/constants";

    const dispatch = createEventDispatcher();

    export let step = StepType.FIRST_BUY_SELL_STEP
    export let share = {
        id: 0,
        amount: 0,
        canBuy: 0
    }

    let prevValue = step === StepType.FIRST_BUY_SELL_STEP ? share.amount : share.amount - share.lockedAmount;

    function handleChange(event) {
        let newValue = parseInt(event.target.value);
        if (newValue <= (prevValue + share.canBuy)) {
            let buySellValue = newValue - prevValue
            prevValue = newValue
            if (step === StepType.FIRST_BUY_SELL_STEP) {
                share.lockedAmount = buySellValue > 0 ? buySellValue : 0
            }
            dispatch('buysell', {
                shareId: share.id,
                buySellAmount: buySellValue
            })
        } else {
            share.amount = prevValue
        }
    }

    function buyAll(event) {
        share.amount = share.amount + share.canBuy
        if (step === StepType.FIRST_BUY_SELL_STEP) {
            share.lockedAmount = share.canBuy
        }
        prevValue = share.amount
        dispatch('buysell', {
            shareId: share.id,
            buySellAmount: share.canBuy
        })
    }

    function sellAll(event) {
        let buySellValue = step === StepType.FIRST_BUY_SELL_STEP ? -share.amount : -(share.amount - share.lockedAmount)
        share.amount = step === StepType.FIRST_BUY_SELL_STEP ? 0 : share.lockedAmount
        if (step === StepType.FIRST_BUY_SELL_STEP) {
            share.lockedAmount = 0
        }
        prevValue = share.amount
        dispatch('buysell', {
            shareId: share.id,
            buySellAmount: buySellValue
        })
    }
</script>


{#if step === StepType.LAST_BUY_SELL_STEP && share.lockedAmount > 0}
    <div>&#128274; {share.lockedAmount}</div>
{/if}
<label>
    <input type="number" bind:value={share.amount} min="0" max={share.amount + share.canBuy}
           on:change={handleChange}
           class="form-control form-control-sm" style="width: 5em;"/>
</label>
<div class="btn-group btn-group-sm" role="group">
    {#if (step === StepType.FIRST_BUY_SELL_STEP && share.amount > 0) || (share.amount - share.lockedAmount) > 0}
        <button on:click={sellAll} class="btn btn-secondary">- {share.amount - (step === StepType.FIRST_BUY_SELL_STEP ? 0 : share.lockedAmount)}</button>
    {/if}
    {#if share.canBuy > 0}
        <button on:click={buyAll} class="btn btn-secondary">+ {share.canBuy}</button>
    {/if}
</div>

