<script>
	import {Router} from 'svelte-router-spa'
	import {routes} from './routes'
    import {getMessages} from "./scripts/queue";
    import {REFRESH_INTERVAl} from "./scripts/constants";
    import { authenticated } from  './stores.js'
    import {handleNotifications} from "./scripts/notificationHandler";
    import Menu from './components/Menu.svelte'
    import ChatModalWindow from './components/ChatModalWindow.svelte';

    let is_authenticated = false;
    let refreshStarted = false
    let showModalWindow = false

    authenticated.subscribe(value => {
        is_authenticated = value;
    })

    let interval

    function checkMessagesQueue() {
        if (is_authenticated) {
            getMessages(function (value) {
                if (value !== undefined) {
                    handleNotifications(value)
                }
            })
        }
    }

    function startRefresh() {
        if (!refreshStarted) {
            interval = setInterval(checkMessagesQueue, REFRESH_INTERVAl)
            refreshStarted = true
        }
    }

    function stopRefresh() {
        if (refreshStarted) {
            clearInterval(interval);
            refreshStarted = false
        }
    }

    function onShowChatWindow() {
        showModalWindow = true
    }

    function onHideChatWindow() {
        showModalWindow = false
    }

    window.addEventListener('focus', startRefresh);
    window.addEventListener('blur', stopRefresh);
</script>

<Menu on:showchatwindow={onShowChatWindow}/>
<Router {routes}/>
<ChatModalWindow isOpen={showModalWindow} on:hide={onHideChatWindow}/>
