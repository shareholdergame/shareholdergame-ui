<script>
    import { authenticated, user } from '../stores.js'
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    {#if $authenticated}
        <a class="navbar-brand" href="/secure/home">
            <img src="/logo-15-small.png" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy">
            Home
        </a>
    {:else}
        <a class="navbar-brand" href="/">
            <img src="/logo-15-small.png" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy">
            Game Stockholder
        </a>
    {/if}

    {#if $authenticated}
        <ul class="nav navbar-nav">
            <li><a class="nav-link" href="/secure/newgame">New Game</a></li>
            <li><a class="nav-link" href="/secure/gamesarchive">Games Archive</a></li>
            <li><a class="nav-link" href="/secure/players">Players</a></li>
        </ul>
    {/if}

    <ul class="nav navbar-nav">
        <li><a class="nav-link" href="/about">About Game</a></li>
        <li><a class="nav-link" href="/rules">Rules</a></li>
        <li><a class="nav-link" href="http://forum.stockholdergame.com">Forum</a></li>
    </ul>

    <ul class="nav navbar-nav">
        {#if $authenticated}
            <li><a class="nav-link" href="/secure/profile">{$user}</a></li>
        {:else}
            <li><a class="nav-link" href="/signin">Sign In</a></li>
            <li><a class="nav-link" href="/signup">Sign Up</a></li>
        {/if}
    </ul>
</nav>
