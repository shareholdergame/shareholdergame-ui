<script>
    import { SHARES } from '../scripts/gameDescription'

    export let step = {}
</script>

{#if step !== undefined && step.sharePrices !== undefined && step.sharePrices['1'] !== undefined}
    <table class="w-100">
        <tr>
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
