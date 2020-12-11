<script>
    import { SHARES, getCardName, getShareId } from '../scripts/gameDescription'
    import { Colors } from "../scripts/constants";

    export let cardId = 0
    export let step = {}
</script>

{#if step !== undefined && step.sharePrices !== undefined && step.sharePrices['1'] !== undefined}
    <table class="w-100 h-100">
        <tr>
            {#if cardId !== null && cardId !== 0}
                <td class="w-20 pr-1 text-right" style="background-color: {Colors[getShareId(cardId)]}">
                    {getCardName(cardId)}
                </td>
            {:else}
                <td class="w-20">
                </td>
            {/if}
            {#each SHARES as shareId}
                <td class="w-15 text-center">{step.sharePrices[shareId].price}</td>
            {/each}
            <td class="w-20 pr-1 text-right">{step.cash}</td>
        </tr>
    </table>
{/if}
