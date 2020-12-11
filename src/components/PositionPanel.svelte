<script>
    import { SHARES } from '../scripts/gameDescription'
    import PriceScale from './PriceScale.svelte'

    export let currentPosition = {}

    export function updateCurrentPosition(cp) {
        currentPosition = cp
    }
</script>

<div class="row">
    <div class="col-md-6">
        Price
    </div>
    {#if currentPosition.hasOwnProperty('playerPositions')}
        {#each Object.entries(currentPosition.playerPositions) as [turnOrder, playerPosition]}
            <div class="col-md-1">{turnOrder} - {playerPosition.name}</div>
        {/each}
    {/if}
</div>
<div class="row" style="margin-bottom: 10px">
    <div class="col-md-6">
        {#if currentPosition.hasOwnProperty('sharePrices')}
            {#each SHARES as shareId}
                <PriceScale shareId={shareId} currentPosition="{currentPosition}"/>
            {/each}
        {/if}
    </div>
    {#if currentPosition.hasOwnProperty('playerPositions')}
        {#each Object.entries(currentPosition.playerPositions) as [turnOrder, playerPosition]}
            <div class="col-md-1">
                {#each Object.entries(playerPosition.shares) as [shareId, share]}
                    <div>{share.amount}</div>
                {/each}
            </div>
        {/each}
    {/if}
</div>
<div class="row">
    <div class="col-md-6 text-right">Cash</div>
    {#if currentPosition.hasOwnProperty('playerPositions')}
        {#each Object.entries(currentPosition.playerPositions) as [turnOrder, playerPosition]}
            <div class="col-md-1">
                {playerPosition.cash}
            </div>
        {/each}
    {/if}
</div>
<div class="row">
    <div class="col-md-6 text-right">Total</div>
    {#if currentPosition.hasOwnProperty('playerPositions')}
        {#each Object.entries(currentPosition.playerPositions) as [turnOrder, playerPosition]}
            <div class="col-md-1">
                {playerPosition.total}
            </div>
        {/each}
    {/if}
</div>
