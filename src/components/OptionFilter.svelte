<script>
    import { createEventDispatcher } from 'svelte';
    import {GAME_OPTIONS} from '../scripts/constants'

    const dispatch = createEventDispatcher();
</script>

Game option
<div class="btn-group ml-3 btn-group-toggle" data-toggle="buttons">
    <label class="btn btn-outline-secondary active">
        <input type="radio" name="options" id="option1" autocomplete="off" checked on:change={() => dispatch('selectOption', 'all')}>All
    </label>
    {#each Object.entries(GAME_OPTIONS) as [gameOptionName, gameOption]}
        <label class="btn btn-outline-secondary">
            <input type="radio" name="options" id="option2" autocomplete="off" on:change={() => dispatch('selectOption', gameOptionName)}>{gameOption.title}
        </label>
    {/each}
</div>
