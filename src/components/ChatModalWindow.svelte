<script>
    import { createEventDispatcher } from 'svelte';
    import Modal from "sv-bootstrap-modal"
    import {getChats, getMessages, sendChatMessage, markAsRead} from '../scripts/chatService'
    import {newChatMessages} from '../stores.js'
    import { searchPlayer } from '../scripts/player';
    import ChatItem from './ChatItem.svelte'

    const dispatch = createEventDispatcher();
    const CHAT_LIST_MODE = 0
    const SINGLE_CHAT_MODE = 1
    const NEW_CHAT_MODE = 2
    const DEFAULT_MSG_COUNT = 50

    export let isOpen = false

    let chats = []
    let selectedChat = {}
    let chatItems = {}
    let messageText = ''
    let windowMode = CHAT_LIST_MODE
    let players = []
    let userNamePrefix = ''
    let msgCount = 50
    let offset = 0
    let itemsPerPage = DEFAULT_MSG_COUNT
    let selectedUsers = []

    function onClose(event) {
        isOpen = false
        dispatch('hide')
    }

    $: {
        if (isOpen) {
            windowMode = CHAT_LIST_MODE
            selectedUsers = []
            getChats(function (data) {
                console.log(JSON.stringify(data))
                chats = data.chats
            })
        }
    }

    $: {
        if (isOpen && $newChatMessages.length > 0 && windowMode === SINGLE_CHAT_MODE) {
            for (const chatMessage of $newChatMessages) {
                if (chatMessage.chatId === selectedChat.chatId) {
                    let unreadMessageIds = []
                    getMessages(selectedChat.chatId, DEFAULT_MSG_COUNT, function (data) {
                        handleMessages(data);
                        scrollMessagesDivToEnd();
                        if (unreadMessageIds.length > 0) {
                            markAsRead(unreadMessageIds, function (data) {})
                        }
                    })
                    break;
                }
            }
        }
    }

    function handleMessages(data, unreadMessageIds) {
        let chatTextDiv = document.getElementById('chat-text')
        for (const message of data.messages) {
            if (!message.isRead) {
                unreadMessageIds.push(message.messageId)
            }
            let innerHtml = '<small><b>' + message.senderName + ', ' + message.dateTime
                + '</b>' + '</br>' + message.text + '</small>'

            let pText = document.createElement('p')
            pText.innerHTML = innerHtml
            chatTextDiv.appendChild(pText)
        }
    }

    function scrollMessagesDivToEnd() {
        let chatTextDiv = document.getElementById('chat-text')
        chatTextDiv.scrollTo(0, chatTextDiv.scrollHeight)
    }

    function onSelectChat(event) {
        windowMode = SINGLE_CHAT_MODE
        msgCount = DEFAULT_MSG_COUNT
        for (const chat of chats) {
            if (chat.chatId === event.detail) {
                selectedChat = chat
                let unreadMessageIds = []
                getMessages(selectedChat.chatId, msgCount, function (data) {
                    handleMessages(data, unreadMessageIds);
                    scrollMessagesDivToEnd();
                    if (unreadMessageIds.length > 0) {
                        markAsRead(unreadMessageIds, function (data) {})
                    }
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
            }, function (chatId) {
                messageText = ''
                getMessages(chatId, DEFAULT_MSG_COUNT, function (data) {
                    handleMessages(data);
                    scrollMessagesDivToEnd();
                })
            })
        }
    }

    function onBackToChatList(event) {
        windowMode = CHAT_LIST_MODE
    }

    function onNewChatMode(event) {
        userNamePrefix = ''
        windowMode = NEW_CHAT_MODE
        offset = 0
        searchPlayer({name: userNamePrefix, offset: offset, ipp: itemsPerPage}, function (responseBody) {
            players = responseBody.players
        })
    }

    function onSelectUsers(event) {
        let usersListSelect = document.getElementById('users-list')
        let options = usersListSelect.options
        let opt
        for (let i = 0; i < options.length; i++) {
            opt = options[i]
            if (opt.selected) {
                let userName = opt.text
                if (selectedUsers.indexOf(userName) < 0) {
                    selectedUsers.push(opt.text)
                }
            }
        }
        selectedUsers = selectedUsers
    }

    function onStartChat(event) {
        let selectedUsersListSelect = document.getElementById('selected-users-list')
        let options = selectedUsersListSelect.options
        let recipients = []
        let opt
        for (let i = 0; i < options.length; i++) {
            opt = options[i]
            recipients.push(opt.text)
        }

        selectedChat = {
            chatId: '',
            recipients: recipients,
            unreadCount: 0
        }
        windowMode = SINGLE_CHAT_MODE
    }

    function onSearchUserByPrefix(event) {
        if (event.key === 'Enter' && userNamePrefix.length > 2) {
            offset = 0
            searchPlayer({name: userNamePrefix, offset: offset, ipp: itemsPerPage}, function (responseBody) {
                players = responseBody.players
            })
        }
    }

    function onScrollUsersList(event) {
        let usersListSelect = document.getElementById('users-list')
        if (usersListSelect.scrollHeight - Math.abs(usersListSelect.scrollTop) - usersListSelect.clientHeight === 0) {
            offset = offset + itemsPerPage
            searchPlayer({name: userNamePrefix, offset: offset, ipp: itemsPerPage}, function (responseBody) {
                for (const player of responseBody.players) {
                    players.push(player)
                    let opt = document.createElement('option')
                    opt.text = player.player.name
                    opt.value = player.player.name
                    usersListSelect.appendChild(opt)
                }
                usersListSelect.scrollTo(0, usersListSelect.scrollHeight)
            })
        }
    }

    function onScrollMessages(event) {
        let chatTextDiv = document.getElementById('chat-text')
        if (chatTextDiv.scrollTop === 0) {
            msgCount = msgCount + 50
            getMessages(selectedChat.chatId, msgCount, function (data) {
                chatTextDiv.innerHTML = '';
                handleMessages(data);
                chatTextDiv.scrollTo(0, DEFAULT_MSG_COUNT * chatTextDiv.scrollHeight / msgCount)
            })
        }
    }
</script>

<Modal bind:open={isOpen} class="col-sm-4">
    <div class="modal-header">
        <h5 class="modal-title text-truncate">
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
                    <button type="button" class="btn btn-primary btn-block" on:click={onNewChatMode}>New Chat</button>
                </div>
            {:else if windowMode === SINGLE_CHAT_MODE}
                <div class="flex-column w-100">
                    <button type="button" class="btn btn-light btn-block" on:click={onBackToChatList}>&lt;- Back to Chat List</button>
                    <div class="overflow-auto" style="height: 50vh" id="chat-text" on:scroll={onScrollMessages}>
                    </div>
                    <div class="md-form mb-2">
                        <label for="new-chat-msg"></label>
                        <textarea id="new-chat-msg" class="md-textarea form-control" rows="3" on:keypress={onChatTextEnter} bind:value={messageText}></textarea>
                    </div>
                </div>
            {:else}
                <div class="flex-column w-100">
                    <button type="button" class="btn btn-light btn-block" on:click={onBackToChatList}>&lt;- Back to Chat List</button>
                    <div class="d-flex flex-row">
                        <div class="flex-column w-40">
                            <label for="userNamePrefix">Поиск игроков</label>
                            <input type="text" id="userNamePrefix" class="form-control" bind:value={userNamePrefix}
                                   placeholder="Type at least 3 letters..." on:keypress={onSearchUserByPrefix}/>
                            <label for="users-list"></label>
                            <select multiple class="form-control" id="users-list" size="20" on:scroll={onScrollUsersList}>
                                {#each players as player}
                                    <option>{player.player.name}</option>
                                {/each}
                            </select>
                        </div>
                        <div class="d-flex align-items-center">
                            <button type="button" class="btn btn-primary btn-sm m-2" style="height: 5vh" on:click={onSelectUsers}>&gt;&gt;</button>
                        </div>
                        <div class="flex-column w-40">
                            <label for="selected-users-list"></label>
                            <select multiple class="form-control" id="selected-users-list" size="20">
                                {#each selectedUsers as user}
                                    <option>{user}</option>
                                {/each}
                            </select>
                            <button type="button" class="btn btn-primary" on:click={onStartChat}>Start Chat</button>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</Modal>
