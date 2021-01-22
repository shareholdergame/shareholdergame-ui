<script>
    import {createEventDispatcher} from 'svelte';
    import {formatOperation} from '../scripts/gameDescription'

    const dispatch = createEventDispatcher();

    export let cellStatus = {
        fixedColor: false,
        selected: false,
        selectedOperand: '',
        shareId: 0,
        operations: []
    }

    function selectCardOperation(event) {
        cellStatus.selected = true
        if (cellStatus.operations.length === 1) {
            cellStatus.selectedOperand = cellStatus.operations[0].operand
        }
        dispatch('colorselected', {
            selectedOperand: cellStatus.selectedOperand,
            shareId: cellStatus.shareId
        })
    }
</script>

<style>
    button {
        background: none !important;
        border: none;
        padding: 0 !important;
        text-decoration: underline;
        cursor: pointer;
    }
</style>

{#if cellStatus.operations.length > 0}
    {#if cellStatus.operations[0].shareId !== 0}
        <td class="w-15 pr-1 text-right game-card-cell-color share-color-{cellStatus.operations[0].shareId}">
            {formatOperation(cellStatus.operations[0])}
        </td>
    {:else}
        <td class="w-15 pr-1 pl-1 text-right share-alt-color-{cellStatus.selected ? cellStatus.shareId : 0}">
            {#if cellStatus.operations.length > 1}
                <select bind:value={cellStatus.selectedOperand}
                        class="form-control form-control-sm" on:blur={selectCardOperation}>
                    <option></option>
                    {#each cellStatus.operations as operation}
                        <option>{formatOperation(operation)}</option>
                    {/each}
                </select>
            {:else}
                <button class="text-black-50" style="font-size: small"
                        on:click={selectCardOperation}>{formatOperation(cellStatus.operations[0])}</button>
            {/if}
        </td>
    {/if}
{/if}