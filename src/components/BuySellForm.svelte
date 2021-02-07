<script>
    import { createEventDispatcher } from 'svelte';
    import SingleBuySellForm from './SingleBuySellForm.svelte'
    import { calculateCanBuy } from '../scripts/playGamePageMediator'
    import { SHARES } from '../scripts/gameDescription'
    import {StepType} from "../scripts/constants";

    const dispatch = createEventDispatcher();

    export let step = StepType.FIRST_BUY_SELL_STEP;
    export let sharePrices = {}
    export let playerPosition = {}

    let controls = {}

    function buySellShare(event) {
        let buySellData = event.detail
        let buySellAmount = buySellData.buySellAmount
        if (buySellAmount !== 0) {
            let cost = buySellAmount * sharePrices[buySellData.shareId].price
            if (cost < 0 || (cost > 0 && cost <= playerPosition.cash)) {
                playerPosition.cash = playerPosition.cash - cost
                playerPosition.shares[buySellData.shareId].amount = playerPosition.shares[buySellData.shareId].amount + buySellAmount
            }
            let shares = playerPosition.shares
            for (const shareId in shares) {
                if (shares.hasOwnProperty(shareId)) {
                    shares[shareId].canBuy = calculateCanBuy(playerPosition.cash, sharePrices[shareId].price)
                    shares[shareId].total = shares[shareId].amount * sharePrices[shareId].price
                }
            }
        }
        dispatch('buysell', buySellData)
    }

    export function reset() {
        for (const shareId of SHARES) {
            if (controls.hasOwnProperty(shareId)) {
                controls[shareId].reset()
            }
        }
    }
</script>

<table>
    <tr>
        {#each SHARES as shareId}
            <td class="w-20"><SingleBuySellForm bind:this={controls[shareId]} step={step} share="{playerPosition.shares[shareId]}" on:buysell={buySellShare}/></td>
        {/each}
        <td class="w-20"><em>{playerPosition.cash}</em></td>
    </tr>
</table>
