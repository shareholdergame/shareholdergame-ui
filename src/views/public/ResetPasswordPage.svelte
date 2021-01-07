<script>
    import {navigateTo} from 'svelte-router-spa'
    import {resetPassword} from "../../scripts/accountService";

    export let currentRoute
    export let params = {}

    let email = '';

    function onClick(event) {
        resetPassword(email, function () {
            navigateTo('/signin')
        })
    }
</script>

<svelte:head>
    <title>Game Stockholder - Reset Password</title>
</svelte:head>

<div class="container-fluid">
    <div class="row justify-content-md-center">
        <div class="col-lg-4">
            <h2>Reset Password</h2>

            <div class="form-group">
                <label for="emailInput">Email</label>
                <input bind:value={email} type="text" id="emailInput" class="form-control"
                       placeholder="Enter your email"/>
            </div>
            <button type="submit" class="btn btn-primary" on:click={onClick}>Reset Password</button>
        </div>
    </div>
</div>