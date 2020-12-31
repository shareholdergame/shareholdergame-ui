<script>
    import { createEventDispatcher } from 'svelte';
    import {StepType} from "../scripts/constants";

    const dispatch = createEventDispatcher();

    export let step = StepType.FIRST_BUY_SELL_STEP
    export let share = {
        id: 0,
        amount: 0,
        canBuy: 0,
        initialAmount: 0,
        lockedAmount: 0,
        total: 0
    }

    let value = share.amount

    export function reset() {
        value = share.amount
    }

    function handleChange(event) {
        if (value !== share.amount) {
            if (value > share.amount + share.canBuy) {
                value = share.amount + share.canBuy
            } else if (value < share.lockedAmount) {
                value = share.lockedAmount
            }

            dispatch('buysell', {
                shareId: share.id,
                buySellAmount: value - share.amount
            })
        }
    }

    function buyAll(event) {
        value = value + share.canBuy
        dispatch('buysell', {
            shareId: share.id,
            buySellAmount: share.canBuy
        })
    }

    function sellAll(event) {
        let buySellValue = share.lockedAmount - share.amount
        value = value + buySellValue
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
    <input type="number" bind:value={value} min="{share.lockedAmount}" max={share.amount + share.canBuy}
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
<div>
    <span class="text-black-50"><em>{share.total}</em></span>
</div>

