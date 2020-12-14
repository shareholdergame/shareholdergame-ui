<script>
    import { SHARES } from '../scripts/gameDescription'

    export let step = {}
</script>

{#if step !== undefined && step.shares !== undefined}
    <table class="w-100 h-100">
        <tr>
            {#each SHARES as shareId}
                <td class="w-20 pr-1 text-right">
                    {#if step.shares[shareId].repurchased}
                        <del class="text-black-50">{step.shares[shareId].amountBeforeRepurchase}</del>
                    {/if}
                    {#if step.shares[shareId].amount > 0}
                        {step.shares[shareId].amount}
                    {/if}
                </td>
            {/each}
            <td class="w-20 pr-1 text-right"><em>{step.cash}</em></td>
        </tr>
    </table>
{/if}
