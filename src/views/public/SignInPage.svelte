<script>
    import {authenticate} from '../../auth.js';
    import {navigateTo} from 'svelte-router-spa'

    export let currentRoute
    export let params = {}

    let userNameOrEmail = '';
    let password = '';

    function signIn() {
        authenticate(userNameOrEmail, password, function () {
            navigateTo('/secure/home')
        });
    }
</script>

<svelte:head>
    <title>Game Stockholder - Sign In</title>
</svelte:head>

<div class="container-fluid">
    <div class="row justify-content-md-center">
        <div class="col-lg-4">
            <h2>Sign In</h2>
            <div class="form-group">
                <label for="emailOrUserName">User name or Email</label>
                <input bind:value={userNameOrEmail} type="text" id="emailOrUserName" class="form-control"
                       placeholder="Enter your name or email"/>
            </div>
            <div class="form-group">
                <label for="userPassword">Password</label>
                <input bind:value={password} type="password" id="userPassword" class="form-control"
                       placeholder="Enter your password"/>
            </div>
            <button type="submit" class="btn btn-primary" on:click={signIn}>Sign In</button>
        </div>
    </div>
</div>
