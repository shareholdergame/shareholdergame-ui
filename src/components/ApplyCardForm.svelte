<script>
    import { createEventDispatcher } from 'svelte';
    import { SHARES, CARD_SET } from '../scripts/gameDescription'
    import CardRow, {deSelect} from './CardRow.svelte'

    const dispatch = createEventDispatcher();

    export let playerCards = []

    let cardRows = {}
    let applyCardBtn
    let selectedPlayerCardId

    function cardSelected(event) {
        let playerCardId = parseInt(event.detail.playerCard.id)
        selectedPlayerCardId = playerCardId
        for (const playerCard of playerCards) {
            if (playerCard.id !== playerCardId && !playerCard.applied) {
                if (cardRows.hasOwnProperty(playerCard.id)) {
                    cardRows[playerCard.id].deSelect()
                }
            }
        }
    }

    function applyCard(event) {
        if (selectedPlayerCardId === undefined) {
            return;
        }
        let cellStatuses = cardRows[selectedPlayerCardId].getCellStatuses()
        let playerCard = cardRows[selectedPlayerCardId].getPlayerCard()
        let operations = {}
        for (const shareId of SHARES) {
            if (cellStatuses[shareId].selected) {
                if (cellStatuses[shareId].operations.length > 1) {
                    let selectedOperand = cellStatuses[shareId].selectedOperand
                    operations[shareId] = getOperationByOperandValue(cellStatuses[shareId].operations, selectedOperand)
                } else {
                    operations[shareId] = cellStatuses[shareId].operations[0]
                }
            } else if (cellStatuses[shareId].operations.length > 1) {
                return
            }
        }

        dispatch('cardapplied', {
            playerCardId: selectedPlayerCardId,
            cardId: playerCard.cardId,
            operations: operations
        })
    }

    function getOperationByOperandValue(operations, selectedOperand) {
        for (const operation of operations) {
            if (('' + operation.operand) === selectedOperand) {
                return operation
            }
        }
        return undefined
    }
</script>

<table class="w-100">
    {#each playerCards as playerCard}
        {#if CARD_SET.hasOwnProperty(playerCard.cardId) && !playerCard.applied}
            <tr>
                <CardRow bind:this={cardRows[playerCard.id]} playerCard={playerCard} on:cardselected={cardSelected}/>
                <td class="w-20"></td>
            </tr>
        {/if}
    {/each}
</table>
<div class="text-center p-2">
    <button bind:this={applyCardBtn} on:click={applyCard} class="btn btn-secondary form-control-sm">Apply</button>
</div>
