<script>
    import { onMount } from 'svelte';
    import {navigateTo} from 'svelte-router-spa'
    import {authenticate} from "../../auth";
    import {errorMessage} from "../../stores";
    import {checkUserExistence, signUp} from "../../scripts/accountService";

    export let currentRoute
    export let params = {}

    let userName = ''
    let email = ''
    let password = ''

    let userNameInput
    let emailInput
    let passwordInput
    let confirmPasswordInput

    function validate() {
        let validateResult = userNameInput.checkValidity() && emailInput.checkValidity() && passwordInput.checkValidity()
        if (confirmPasswordInput.value !== password) {
            confirmPasswordInput.setCustomValidity('Passwords do not match.')
            validateResult = false
        } else {
            confirmPasswordInput.setCustomValidity('')
        }
        return validateResult
    }

    function onSignUp() {
        if (validate()) {
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
                                    password = ''
                                    navigateTo('/secure/home')
                                })
                            })
                        }
                    })
                }
            })
        }
    }

    onMount(() => {
        errorMessage.set('')
    })
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
                <input bind:this={userNameInput} bind:value={userName} type="text" minlength="3" id="userNameInput" class="form-control"
                       placeholder="Enter your name"/>
            </div>
            <div class="form-group">
                <label for="emailInput">Email</label>
                <input bind:this={emailInput} bind:value={email} type="email" id="emailInput" class="form-control"
                       placeholder="Enter your email"/>
            </div>
            <div class="form-group">
                <label for="passwordInput">Password</label>
                <input bind:this={passwordInput} bind:value={password} type="password" minlength="6" id="passwordInput" class="form-control"
                       placeholder="Enter your password"/>
            </div>
            <div class="form-group">
                <label for="confirmPasswordInput">Confirm Password</label>
                <input bind:this={confirmPasswordInput} type="password" id="confirmPasswordInput" class="form-control"
                       minlength="6" placeholder="Confirm your password"/>
            </div>
            <button type="submit" class="btn btn-primary" on:click={onSignUp}>Sign Up</button>
        </div>
    </div>
</div>
