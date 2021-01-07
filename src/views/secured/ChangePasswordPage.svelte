<script>
    import {navigateTo} from 'svelte-router-spa'
    import {errorMessage} from "../../stores";
    import {updateAccount} from "../../scripts/accountService";

    export let currentRoute
    export let params = {}

    let passwordUpdate = {
        oldPassword: '',
        newPassword: ''
    }

    let confirmPasswordInput
    let oldPasswordInput
    let newPasswordInput

    function onChangePassword() {
        let validateResult = oldPasswordInput.checkValidity() && newPasswordInput.checkValidity()
        if (confirmPasswordInput.value !== newPasswordInput.value) {
            confirmPasswordInput.setCustomValidity('Passwords do not match.')
            validateResult = false
        } else {
            confirmPasswordInput.setCustomValidity('')
        }
        if (validateResult) {
            updateAccount({passwordUpdate: passwordUpdate}, function () {
                navigateTo('/secure/profile')
            })
        }
    }

    function onCancelChangePassword() {
        navigateTo('/secure/profile')
    }
</script>

<svelte:head>
    <title>Game Stockholder - Change Password</title>
</svelte:head>

<div class="container-fluid">
    <div class="row justify-content-md-center">
        <div class="col-lg-4">
            <h2>Change Password</h2>
            {#if $errorMessage !== ''}
                <div class="alert alert-danger" role="alert">
                    {$errorMessage}
                </div>
            {/if}
            <div class="form-group">
                <label for="oldPasswordInput">Old Password</label>
                <input bind:this={oldPasswordInput} bind:value={passwordUpdate.oldPassword}
                       type="password" id="oldPasswordInput" class="form-control" required
                       placeholder="Enter old password"/>
            </div>
            <div class="form-group">
                <label for="newPasswordInput">New Password</label>
                <input bind:this={newPasswordInput} bind:value={passwordUpdate.newPassword}
                       type="password" id="newPasswordInput" class="form-control" minlength="6"
                       placeholder="Enter new password"/>
            </div>
            <div class="form-group">
                <label for="confirmPasswordInput">Confirm New Password</label>
                <input bind:this={confirmPasswordInput} type="password" id="confirmPasswordInput" class="form-control"
                       placeholder="Confirm new password" minlength="6"/>
            </div>
            <button type="button" class="btn btn-success" on:click={onChangePassword}>Save</button>
            <button type="button" class="btn btn-danger" on:click={onCancelChangePassword}>Cancel</button>
        </div>
    </div>
</div>
