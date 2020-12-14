<script>
    import { SHARES } from '../scripts/gameDescription'
</script>

<div class="row mb-1">
    <div class="col-md-1 text-center">
        Round / Turn
    </div>
    <div class="col-md-3">
        <table class="w-100 h-100">
            <tr>
                {#each SHARES as shareId}
                    <td class="share-color-{shareId}">&nbsp;</td>
                {/each}
                <td class="w-20 text-center">Cash</td>
            </tr>
        </table>
    </div>
    <div class="col-md-4">
        <table class="w-100 h-100">
            <tr>
                <td class="w-20 text-center">Card</td>
                {#each SHARES as shareId}
                    <td class="share-color-{shareId}">&nbsp;</td>
                {/each}
                <td class="w-20 text-center">Cash</td>
            </tr>
        </table>
    </div>
    <div class="col-md-3">
        <table class="w-100 h-100">
            <tr>
                {#each SHARES as shareId}
                    <td class="share-color-{shareId}">&nbsp;</td>
                {/each}
                <td class="w-20 text-center">Cash</td>
            </tr>
        </table>
    </div>
    <div class="col-md-1 text-center">
        Total
    </div>
</div>
