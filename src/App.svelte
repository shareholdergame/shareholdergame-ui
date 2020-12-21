<script>
	import {Router} from 'svelte-router-spa'
	import {routes} from './routes'
    import {getMessages} from "./scripts/queue";
    import {REFRESH_INTERVAl} from "./scripts/constants";
    import { authenticated } from  './stores.js'
    import {handleNotifications} from "./scripts/notificationHandler";
    import Menu from './components/Menu.svelte'

    let is_authenticated = false;

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
        } else {
            clearInterval(interval)
        }
    }

    function startRefresh() {
        interval = setInterval(checkMessagesQueue, REFRESH_INTERVAl)
    }
    function stopRefresh() {
        clearInterval(interval);
    }

    window.addEventListener('focus', startRefresh);
    window.addEventListener('blur', stopRefresh);
</script>

<Menu />
<Router {routes}/>
