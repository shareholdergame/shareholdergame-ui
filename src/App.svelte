<script>
	import {Router} from 'svelte-router-spa'
	import {routes} from './routes'
	import Menu from './components/Menu.svelte'
</script>

<Menu />
<Router {routes}/>
