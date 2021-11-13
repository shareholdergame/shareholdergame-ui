<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let chat = {
        recipients: []
    }

    function onClick(event) {
        dispatch('selectchat', chat.chatId)
    }
</script>

<div class="card mb-1" on:click={onClick}>
    <div class="card-body p-2 text-truncate">
        {#each chat.recipients as recipient}
            <b>&nbsp;{recipient}</b>
        {/each}
        {#if chat.unreadCount !== undefined && chat.unreadCount > 0}
            <span class="badge badge-primary">{chat.unreadCount}</span>
        {/if}
    </div>
</div>
