<script>
    import { getCardName, getShareId } from '../scripts/gameDescription'

    export let cardId = 0
</script>

<table class="w-100">
    <tr>
        {#if cardId !== null && cardId !== 0}
            <td class="pr-1 text-right game-card-cell-color share-color-{getShareId(cardId)}">
                <strong>{getCardName(cardId)}</strong>
            </td>
        {:else}
            <td>
            </td>
        {/if}
    </tr>
</table>
