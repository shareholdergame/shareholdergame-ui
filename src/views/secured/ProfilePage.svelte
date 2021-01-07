<script>
    import { onMount } from 'svelte';
    import {navigateTo} from 'svelte-router-spa'
    import {getProfile} from "../../scripts/profile";
    import {getAccountDetails} from "../../auth";
    import {errorMessage} from "../../stores";

    export let currentRoute
    export let params = {}

    let account
    let profile

    function getAccountData() {
        getAccountDetails(function (value) {
            account = value
        })
    }

    function getProfileData() {
        getProfile(function (value) {
            profile = value
        })
    }

    function onEditAccountClick() {
        navigateTo('/secure/account/edit')
    }

    function onChangePasswordClick() {
        navigateTo('/secure/account/changepassword')
    }

    onMount(() => {
        getAccountData()
        getProfileData()
    })
</script>

<svelte:head>
    <title>Game Stockholder - Profile</title>
</svelte:head>

<div class="container-fluid">
    {#if $errorMessage !== ''}
        <div class="row">
            <div class="alert alert-danger" role="alert">
                {$errorMessage}
            </div>
        </div>
    {/if}
    <div class="row mb-3 mt-3 justify-content-md-center">
        <div class="col">
            {#if profile !== undefined}
                <h2>{profile.playerWithLocation.player.name}</h2>
            {/if}
        </div>
    </div>
    {#if account !== undefined && profile !== undefined}
        <div class="row">
            <div class="col">
                <h3>Account</h3>
            </div>
            <div class="col">
                <h3>Profile</h3>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <table class="table table-borderless">
                    <tr>
                        <td>Email:</td>
                        <td>{account.email}</td>
                    </tr>
                    <tr>
                        <td>Registration Date:</td>
                        <td>{account.creationDate}</td>
                    </tr>
                    <tr>
                        <td>Language:</td>
                        <td>{account.language}</td>
                    </tr>
                    <tr>
                        <td>Account Status:</td>
                        <td>{account.status}</td>
                    </tr>
                </table>
            </div>
            <div class="col">
                <table class="table table-borderless">
                    <tr>
                        <td>Country:</td>
                        <td>{profile.playerWithLocation.location.country}</td>
                    </tr>
                    <tr>
                        <td>State/Province:</td>
                        <td>{profile.playerWithLocation.location.stateProvince}</td>
                    </tr>
                    <tr>
                        <td>City:</td>
                        <td>{profile.playerWithLocation.location.city}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <button class="btn btn-primary" on:click={onEditAccountClick}>Edit Account</button>
                <button class="btn btn-primary" on:click={onChangePasswordClick}>Change Password</button>
            </div>
            <div class="col">
                <!--<button class="btn btn-primary" on:click={onEditProfileClick}>Edit</button>-->
            </div>
        </div>
    {/if}
</div>
