<script>
    import { createEventDispatcher } from 'svelte';
    import Modal from "sv-bootstrap-modal"
    import {getChats, getMessages, sendChatMessage} from '../scripts/chatService'
    import ChatItem from './ChatItem.svelte'

    const dispatch = createEventDispatcher();
    const CHAT_LIST_MODE = 0
    const SINGLE_CHAT_MODE = 1
    const NEW_CHAT_MODE = 2

    export let isOpen = false

    let chats = []
    let selectedChat = {}
    let messages = []
    let chatItems = {}
    let messageText = ''
    let windowMode = CHAT_LIST_MODE

    function onClose(event) {
        isOpen = false
        dispatch('hide')
    }

    $: {
        if (isOpen) {
            getChats(function (data) {
                console.log(JSON.stringify(data))
                chats = data.chats
            })
        }
    }

    function onSelectChat(event) {
        for (const chat of chats) {
            if (chat.chatId === event.detail) {
                selectedChat = chat
                getMessages(chat.chatId, function (data) {
                    windowMode = SINGLE_CHAT_MODE
                    messages = data.messages
                })
                break;
            }
        }
    }

    function onChatTextEnter(event) {
        if (event.key === 'Enter' && selectedChat !== undefined && messageText.trim().length > 0) {
            sendChatMessage({
                recipients: selectedChat.recipients,
                text: messageText
            }, function () {
                messageText = ''
                getMessages(selectedChat.chatId, function (data) {
                    messages = data.messages
                })
            })
        }
    }

    function onBackToChatList(event) {
        windowMode = CHAT_LIST_MODE
    }

    function onNewChatMode(event) {
        windowMode = NEW_CHAT_MODE
    }
</script>

<Modal bind:open={isOpen} class="col-sm-4">
    <div class="modal-header">
        <h5 class="modal-title">
            {#if windowMode === CHAT_LIST_MODE}
                Chats
            {:else if windowMode === SINGLE_CHAT_MODE}
                Chat with
                {#each selectedChat.recipients as recipient}
                    <b>&nbsp;{recipient}</b>
                {/each}
            {:else}
                New Chat
            {/if}
        </h5>
        <button type="button" class="close" on:click={onClose}>
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        <div class="d-flex flex-row">
            {#if windowMode === CHAT_LIST_MODE}
                <div class="flex-column w-100">
                    <div class="overflow-auto" style="height: 70vh">
                        {#each chats as chat}
                            <ChatItem chat={chat} bind:this={chatItems[chat.chatId]} on:selectchat={onSelectChat}/>
                        {/each}
                    </div>
                    <button type="button" class="btn btn-primary btn-lg btn-block" on:click={onNewChatMode}>New Chat</button>
                </div>
            {:else if windowMode === SINGLE_CHAT_MODE}
                <div class="flex-column w-100">
                    <div class="overflow-auto" style="height: 50vh" id="chat-text">
                            <small>
                                {#each messages as message}
                                    <b>{message.senderName}, {message.dateTime}</b>{#if message.isRead}v{/if}<br/>
                                    {message.text}<br/><br/>
                                {/each}
                            </small>
                    </div>
                    <div class="md-form mb-2">
                        <label for="new-chat-msg"></label>
                        <textarea id="new-chat-msg" class="md-textarea form-control" rows="3" on:keypress={onChatTextEnter} bind:value={messageText}></textarea>
                    </div>
                    <button type="button" class="btn btn-primary btn-lg btn-block" on:click={onBackToChatList}>Back to Chat List</button>
                </div>
            {:else}
                <div class="flex-column w-100">
                    <button type="button" class="btn btn-primary btn-lg btn-block" on:click={onBackToChatList}>Back to Chat List</button>
                </div>
            {/if}
        </div>
    </div>
</Modal>
