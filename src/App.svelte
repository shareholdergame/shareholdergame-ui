<script>
	import {Router} from 'svelte-router-spa'
	import {routes} from './routes'
	import Menu from './components/Menu.svelte'
    import {getMessages} from "./scripts/queue";
    import {REFRESH_INTERVAl} from "./scripts/constants";
    import { authenticated } from  './stores.js'

    let is_authenticated = false;

    authenticated.subscribe(value => {
        is_authenticated = value;
    })

    let interval = setInterval(checkMessagesQueue, REFRESH_INTERVAl)

    function checkMessagesQueue() {
        if (is_authenticated) {
            getMessages(function (value) {
                if (value !== undefined) {
                    console.log(JSON.stringify(value))
                }
            })
        } else {
            clearInterval(interval)
        }
    }
</script>

<Menu />
<Router {routes}/>
