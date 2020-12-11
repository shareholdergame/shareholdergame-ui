<script>
    import {MAX_PRICE} from "../scripts/gameDescription";
    import {Colors} from '../scripts/constants'

    export let shareId
    export let currentPosition = {}
</script>

<!--<div class="container float-right" style="padding: 0; border-style: solid; border-width: 1px; margin: 1px 0 1px 0">
    <div style="background-color: {Colors[shareId]}; width: {currentPosition.sharePrices[shareId].price * 100 / 250}%">{currentPosition.sharePrices[shareId].price}</div>
</div>-->

<div class="container row">
    <div class="text-right w-10 pr-1">
        {currentPosition.sharePrices[shareId].price}
    </div>
    <div class="flex-fill progress">
        <div class="progress-bar" role="progressbar" style="background-color: {Colors[shareId]}; width: {currentPosition.sharePrices[shareId].price * 100 / MAX_PRICE}%"
             aria-valuenow={currentPosition.sharePrices[shareId].price} aria-valuemin="0" aria-valuemax={MAX_PRICE}></div>
    </div>
</div>