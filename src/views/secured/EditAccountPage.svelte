<script>
    import { onMount } from 'svelte';
    import {navigateTo} from 'svelte-router-spa'
    import {errorMessage} from "../../stores";
    import {getAccountDetails} from "../../auth";
    import {updateAccount} from "../../scripts/accountService";

    export let currentRoute
    export let params = {}

    let account

    let accountUpdate = {}

    let newEmailInput
    let newUserNameInput

    function getAccountData() {
        getAccountDetails(function (value) {
            account = value
            accountUpdate.newUserName = account.userName
            accountUpdate.newEmail = account.email
        })
    }

    function onSaveAccount(event) {
        let validateResult = newUserNameInput.checkValidity() && newEmailInput.checkValidity()
        let changed = accountUpdate.newUserName !== account.userName || accountUpdate.newEmail !== account.email
        if (validateResult && changed) {
            updateAccount(accountUpdate, function () {
                navigateTo('/secure/profile')
            })
        }
    }

    function onCancelAccountEdit(event) {
        navigateTo('/secure/profile')
    }

    onMount(() => {
        getAccountData()
    })
</script>

<svelte:head>
    <title>Game Stockholder - Edit Account</title>
</svelte:head>

<div class="container-fluid">
    <div class="row justify-content-md-center">
        <div class="col-lg-4">
            <h2>Edit Account</h2>
            {#if $errorMessage !== ''}
                <div class="alert alert-danger" role="alert">
                    {$errorMessage}
                </div>
            {/if}
            <div class="form-group">
                <label for="newUserNameInput">New User Name</label>
                <input bind:this={newUserNameInput} bind:value={accountUpdate.newUserName} type="text" minlength="3" id="newUserNameInput" class="form-control"/>
            </div>
            <div class="form-group">
                <label for="newEmailInput">New Email</label>
                <input bind:this={newEmailInput} bind:value={accountUpdate.newEmail} type="email" minlength="6" id="newEmailInput" class="form-control"/>
            </div>
            <button type="button" class="btn btn-success" on:click={onSaveAccount}>Save</button>
            <button type="button" class="btn btn-danger" on:click={onCancelAccountEdit}>Cancel</button>
        </div>
    </div>
</div>
