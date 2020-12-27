<script>
    import {navigateTo} from 'svelte-router-spa'
    import {authenticate} from "../../auth";
    import {errorMessage} from "../../stores";
    import {checkUserExistence, signUp} from "../../scripts/accountService";

    export let currentRoute
    export let params = {}

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    let userName = ''
    let email = ''
    let password = ''
    let confirmPasswordInput
    let emailInput

    function onSignUp() {
        emailInput.setCustomValidity(emailRegex.test(email) ? '' : 'Wrong email format')
        confirmPasswordInput.setCustomValidity(confirmPasswordInput.value === password ? '' : 'Passwords do not match.')

        checkUserExistence(userName, function (result) {
            if (result) {
                errorMessage.set('User name already exists')
            } else {
                checkUserExistence(email, function (result) {
                    if (result) {
                        errorMessage.set('Email already exists')
                    } else {
                        let language = window.navigator.language
                        signUp({
                            userName: userName,
                            email: email,
                            password: password,
                            language: language
                        }, function () {
                            authenticate(email, password, function () {
                                navigateTo('/secure/home')
                            })
                        })
                    }
                })
            }
        })
    }
</script>

<svelte:head>
    <title>Game Stockholder - Sign Up</title>
</svelte:head>

<div class="container-fluid">
    <div class="row justify-content-md-center">
        <div class="col-lg-4">
            <h2>Sign Up</h2>
            {#if $errorMessage !== ''}
                <div class="alert alert-danger" role="alert">
                    {$errorMessage}
                </div>
            {/if}
            <div class="form-group">
                <label for="userNameInput">User name</label>
                <input bind:value={userName} type="text" id="userNameInput" class="form-control"
                       placeholder="Enter your name"/>
            </div>
            <div class="form-group">
                <label for="emailInput">Email</label>
                <input bind:this={emailInput} bind:value={email} type="text" id="emailInput" class="form-control"
                       placeholder="Enter your email"/>
            </div>
            <div class="form-group">
                <label for="passwordInput">Password</label>
                <input bind:value={password} type="password" id="passwordInput" class="form-control"
                       placeholder="Enter your password"/>
            </div>
            <div class="form-group">
                <label for="confirmPasswordInput">Confirm Password</label>
                <input bind:this={confirmPasswordInput} type="password" id="confirmPasswordInput" class="form-control"
                       placeholder="Confirm your password"/>
            </div>
            <button type="submit" class="btn btn-primary" on:click={onSignUp}>Sign Up</button>
        </div>
    </div>
</div>
