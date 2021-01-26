<script>
    import {MAX_PRICE} from "../scripts/gameDescription";
    import {Colors} from '../scripts/constants'

    export let shareId
    export let currentPosition = {}
</script>

<div class="d-flex flex-row">
    <div class="text-right pr-1">
        {currentPosition.sharePrices[shareId].price}
    </div>
    <div class="flex-fill progress">
        <div class="progress-bar" role="progressbar" style="background-color: {Colors[shareId]}; width: {currentPosition.sharePrices[shareId].price * 100 / MAX_PRICE}%"
             aria-valuenow={currentPosition.sharePrices[shareId].price} aria-valuemin="0" aria-valuemax={MAX_PRICE}></div>
    </div>
</div>