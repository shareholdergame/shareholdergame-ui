<script>
    export let options = {}
    export let defaultOption
</script>

<div class="btn-group" role="group">
    {#each Object.entries(options) as [key, value]}
        {#if defaultOption !== undefined && defaultOption === key}
            <input type="radio" class="btn-check" name="btnradio" id="{key}_id" autocomplete="off" checked>
            <label class="btn btn-outline-primary" for="{key}_id">{value}</label>
        {:else}
            <input type="radio" class="btn-check" name="btnradio" id="{key}_id" autocomplete="off">
            <label class="btn btn-outline-primary" for="{key}_id">{value}</label>
        {/if}
    {/each}
</div>
