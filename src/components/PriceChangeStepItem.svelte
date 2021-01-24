<script>
    import { SHARES, getCardName, getShareId } from '../scripts/gameDescription'

    //export let cardId = 0
    export let step = {}
</script>

{#if step !== undefined && step.sharePrices !== undefined && step.sharePrices['1'] !== undefined}
    <table class="w-100">
        <tr>
            <!--{#if cardId !== null && cardId !== 0}
                <td class="w-20 pr-1 text-right game-card-cell-color share-color-{getShareId(cardId)}">
                    <strong>{getCardName(cardId)}</strong>
                </td>
            {:else}
                <td class="w-20">
                </td>
            {/if}-->
            {#each SHARES as shareId}
                <td class="w-20 text-center">
                    {#if step.sharePrices[shareId].priceOperationId !== null}
                        {step.sharePrices[shareId].price}
                    {/if}
                </td>
            {/each}
            <td class="w-20 pr-1 text-right"><em>{step.cash}</em></td>
        </tr>
    </table>
{/if}
