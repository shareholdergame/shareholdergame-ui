<script>
    import { SHARES } from '../scripts/gameDescription'
</script>

<div class="row bg-light">
    <div class="col-sm-1 text-center">
        <small>Round / Turn</small>
    </div>
    <div class="col-sm-3">
        <table class="w-100">
            <tr>
                {#each SHARES as shareId}
                    <td class="w-20 text-center game-card-cell-color share-color-{shareId}">1</td>
                {/each}
                <td class="w-20 text-center">Cash</td>
            </tr>
        </table>
    </div>
    <div class="col-sm-4">
        <table class="w-100">
            <tr>
                <td class="w-20 text-center">Card</td>
                {#each SHARES as shareId}
                    <td class="w-15 text-center game-card-cell-color share-color-{shareId}">100</td>
                {/each}
                <td class="w-20 text-center">Cash</td>
            </tr>
        </table>
    </div>
    <div class="col-sm-3">
        <table class="w-100">
            <tr>
                {#each SHARES as shareId}
                    <td class="w-20 share-color-{shareId}">&nbsp;</td>
                {/each}
                <td class="w-20 text-center">Cash</td>
            </tr>
        </table>
    </div>
    <div class="col-sm-1 text-center">
        Total
    </div>
</div>
