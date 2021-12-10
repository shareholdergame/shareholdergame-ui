<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { SHARES, CARD_SET, getOperationsForShare } from '../scripts/gameDescription'
    import CardCell from './CardCell.svelte'

    const dispatch = createEventDispatcher();

    export let playerCard

    let cellStatuses = {}
    let maxSelections = 0

    onMount(() => {
        let card = CARD_SET[playerCard.cardId]
        let nonAssignedOperations = getOperationsForShare(card, 0)
        maxSelections = nonAssignedOperations.length
        for (const shareId of SHARES) {
            let operations = getOperationsForShare(card, shareId)
            let fixedColor = operations.length === 1 && operations[0].shareId !== 0
            cellStatuses[shareId] = {
                fixedColor: fixedColor,
                selected: fixedColor,
                selectedOperand: '',
                shareId: shareId,
                operations: (operations.length > 0 ? operations : nonAssignedOperations)
            }
        }
    })

    function colorSelected(event) {
        let selectedShareId = parseInt(event.detail.shareId)
        let selectedOperand = event.detail.selectedOperand
        for (const shareId of SHARES) {
            if (selectedShareId !== shareId) {
                if (maxSelections < 2) {
                    if (!cellStatuses[shareId].fixedColor) {
                        cellStatuses[shareId].selected = false
                    }
                } else {
                    if (cellStatuses[shareId].selectedOperand === selectedOperand && !cellStatuses[shareId].fixedColor) {
                        cellStatuses[shareId].selectedOperand = ''
                        cellStatuses[shareId].selected = false
                    }
                }
            }
        }
        dispatch('cardselected', {
            playerCard: playerCard
        })
    }

    export function deSelect() {
        for (const shareId of SHARES) {
            cellStatuses[shareId].selected = !!cellStatuses[shareId].fixedColor
            cellStatuses[shareId].selectedOperand = ''
        }
    }

    export function getCellStatuses() {
        return cellStatuses;
    }

    export function getPlayerCard() {
        return playerCard
    }
</script>

{#each SHARES as shareId}
    <CardCell cellStatus={cellStatuses[shareId]} on:colorselected={colorSelected}/>
{/each}
