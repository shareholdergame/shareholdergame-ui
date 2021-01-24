<script>
    import { SHARES } from '../scripts/gameDescription'
    import PriceScale from './PriceScale.svelte'
    import PlayerNameLink from './PlayerNameLink.svelte'

    export let currentPosition = {}

    export function updateCurrentPosition(cp) {
        currentPosition = cp
    }
</script>

<table class="w-100">
    <tr>
        <th class="w-50">Price</th>
        {#if currentPosition.hasOwnProperty('playerPositions')}
            {#each Object.entries(currentPosition.playerPositions) as [turnOrder, playerPosition]}
                <th>
                    <PlayerNameLink name="{playerPosition.name}"/>
                </th>
            {/each}
        {/if}
    </tr>
    {#if currentPosition.hasOwnProperty('sharePrices')}
        {#each SHARES as shareId}
            <tr>
                <td>
                    <PriceScale shareId={shareId} currentPosition="{currentPosition}"/>
                </td>
                {#if currentPosition.hasOwnProperty('playerPositions')}
                    {#each Object.entries(currentPosition.playerPositions) as [turnOrder, playerPosition]}
                        <td>{playerPosition.shares[shareId].amount}&nbsp;&nbsp;
                            <span class="text-black-50"><small><em>{playerPosition.shares[shareId].total}</em></small></span>
                        </td>
                    {/each}
                {/if}
            </tr>
        {/each}
    {/if}
    <tr>
        <td class="text-right pr-4">
            Cash
        </td>
        {#if currentPosition.hasOwnProperty('playerPositions')}
            {#each Object.entries(currentPosition.playerPositions) as [turnOrder, playerPosition]}
                <td>
                    {playerPosition.cash}
                </td>
            {/each}
        {/if}
    </tr>
    <tr>
        <td class="text-right pr-4">
            Total
        </td>
        {#if currentPosition.hasOwnProperty('playerPositions')}
            {#each Object.entries(currentPosition.playerPositions) as [turnOrder, playerPosition]}
                <td>
                    {playerPosition.total}
                </td>
            {/each}
        {/if}
    </tr>
</table>
