<script>
    import { createEventDispatcher } from 'svelte';
    import BuySellWidget from './BuySellWidget.svelte'
    import { calculateCanBuy } from '../scripts/playGamePageMediator'
    import { SHARES } from '../scripts/gameDescription'
    import {StepType} from "../scripts/constants";

    const dispatch = createEventDispatcher();

    export let step = StepType.FIRST_BUY_SELL_STEP;
    export let sharePrices = {}
    export let playerPosition = {}

    function buySellShare(event) {
        let buySellData = event.detail
        let buySellAmount = buySellData.buySellAmount
        if (buySellAmount !== 0) {
            let cost = buySellAmount * sharePrices[buySellData.shareId].price
            if (cost < 0 || (cost > 0 && cost <= playerPosition.cash)) {
                playerPosition.cash = playerPosition.cash - cost
            }
            let shares = playerPosition.shares
            for (const shareId in shares) {
                if (shares.hasOwnProperty(shareId)) {
                    shares[shareId].canBuy = calculateCanBuy(playerPosition.cash, sharePrices[shareId].price)
                }
            }
        }
        dispatch('buysell', buySellData)
    }
</script>

<table style="width: 100%; height: 100%">
    <tr>
        {#each SHARES as shareId}
            <td><BuySellWidget step={step} share="{playerPosition.shares[shareId]}" on:buysell={buySellShare}/></td>
        {/each}
        <td style="width: 20%">{playerPosition.cash}</td>
    </tr>
</table>
