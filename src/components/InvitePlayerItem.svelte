<script>
    import {createEventDispatcher} from 'svelte';
    import PlayerNameLink from './PlayerNameLink.svelte'

    const dispatch = createEventDispatcher();

    export let player = {}
</script>

<div class="card mb-1">
    <div class="card-body">
        <PlayerNameLink name="{player.player.name}"/>
        <div class="float-right">
            <button type="button" class="btn btn-secondary" id="selectUser" on:click={() => dispatch('selectuser', player.player.name)}>Invite</button>
        </div>
    </div>
</div>
