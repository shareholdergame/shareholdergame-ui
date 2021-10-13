<script>
    import { createEventDispatcher } from 'svelte';
    import { authenticated, user } from '../stores.js'
    import {logout} from "../auth";

    const dispatch = createEventDispatcher();

    function onSignOut(event) {
        logout()
    }

    function onClickChatBtn(event) {
        dispatch('showchatwindow')
    }
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    {#if $authenticated}
        <a class="navbar-brand" href="/secure/home">
            <img src="/logo-15-small.png" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy">
            Домой
        </a>
    {:else}
        <a class="navbar-brand" href="/">
            <img src="/logo-15-small.png" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy">
            Игра "Акционер"
        </a>
    {/if}

    {#if $authenticated}
        <ul class="nav navbar-nav">
            <li><a class="nav-link" href="/secure/newgame">Новая Игра</a></li>
            <li><a class="nav-link" href="/secure/gamesarchive">Архив Игр</a></li>
            <li><a class="nav-link" href="/secure/players">Игроки</a></li>
        </ul>
    {/if}

    <ul class="nav navbar-nav">
        <li><a class="nav-link" href="/about">Об Игре</a></li>
        <li><a class="nav-link" href="https://shareholdergame.com/rules/index.html">Правила</a></li>
        <li><a class="nav-link" href="https://forum.stockholdergame.com">Форум</a></li>
    </ul>

    <ul class="nav navbar-nav">
        {#if $authenticated}
            <li><button class="btn btn-outline-secondary" on:click={onClickChatBtn}>Chat</button></li>
            <li><a class="nav-link" href="/secure/profile">{$user}</a></li>
            <!--<li>&#128276;</li>-->
            <li><button class="btn btn-outline-secondary" on:click={onSignOut}>Выйти</button></li>
        {:else}
            <li><a class="nav-link" href="/signin">Войти</a></li>
            <li><a class="nav-link" href="/signup">Регистрация</a></li>
        {/if}
    </ul>
</nav>
