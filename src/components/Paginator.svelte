<script>
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    export let totalItems = 0
    export let itemsPerPage = 0
    export let offset = 0
    export let visiblePagesCount = 10

    let pagesCount = 0
    let currentPage = 0
    let visibleRange

    $: {
        pagesCount = Math.ceil(totalItems / itemsPerPage)
        currentPage = (offset / itemsPerPage) + 1
        visibleRange = recalculateVisibleRange(pagesCount, currentPage)
        console.log(visibleRange)
    }

    function onFirstPageClick(event) {
        selectPage(1)
    }

    function onLastPageClick(event) {
        selectPage(pagesCount)
    }

    function onPrevPageClick(event) {
        if (currentPage === 1) {
            return
        }
        selectPage(currentPage - 1)
    }

    function onNextPageClick(event) {
        if (currentPage === pagesCount) {
            return
        }
        selectPage(currentPage + 1)
    }

    function onPageClick(event) {
        let selectedPage = parseInt(event.target.textContent)
        if (selectedPage !== currentPage) {
            selectPage(selectedPage)
        }
    }

    function selectPage(page) {
        let _offset = (page - 1) * itemsPerPage
        dispatch('selectpage', {
            offset: _offset,
            ipp: itemsPerPage
        })
    }

    function recalculateVisibleRange(pagesCount, currentPage) {
        let halfOfRange = visiblePagesCount / 2
        let firstPage = pagesCount <= visiblePagesCount || currentPage <= halfOfRange ? 1
            : (currentPage >= pagesCount - halfOfRange ? pagesCount - visiblePagesCount : currentPage - halfOfRange)
        let lastPage = pagesCount <= visiblePagesCount ? pagesCount :
            (currentPage <= halfOfRange ? visiblePagesCount
            : (currentPage >= pagesCount - halfOfRange ? pagesCount : currentPage + halfOfRange))
        let i, j
        let arr = []
        for (i = 0, j = firstPage; j <= lastPage; i++, j++) {
            arr[i] = j
        }
        return arr
    }
</script>

<div class="btn-toolbar" role="toolbar">
    <div class="btn-group mr-2" role="group">
        {#if pagesCount > visiblePagesCount}
            <button type="button" class="btn btn-secondary" on:click={onFirstPageClick}>&laquo;&laquo;</button>
        {/if}
        <button type="button" class="btn btn-secondary" on:click={onPrevPageClick}>&laquo;</button>
    </div>
    <div class="btn-group mr-2" role="group">
        {#each visibleRange as pageNum}
            <button type="button" class="btn btn-secondary {currentPage === pageNum ? 'active' : ''}" on:click={onPageClick}>{pageNum}</button>
        {/each}
    </div>
    <div class="btn-group mr-2" role="group">
        <button type="button" class="btn btn-secondary" on:click={onNextPageClick}>&raquo;</button>
        {#if pagesCount > visiblePagesCount}
            <button type="button" class="btn btn-secondary" on:click={onLastPageClick}>&raquo;&raquo;</button>
        {/if}
    </div>
</div>
