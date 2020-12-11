<script>
    export let currentRoute
    export let params = {}

    let userName = ''
    let email = ''
    let password = ''
    let confirmPasswordInput

    function signUp() {
        confirmPasswordInput.setCustomValidity(confirmPasswordInput.value !== password ? 'Passwords do not match.' : '')
        // todo
    }
</script>

<svelte:head>
    <title>Game Stockholder - Sign Up</title>
</svelte:head>

<div class="container-fluid">
    <div class="row justify-content-md-center">
        <div class="col-lg-4">
            <h2>Sign Up</h2>
            <div class="form-group">
                <label for="userNameInput">User name</label>
                <input bind:value={userName} type="text" id="userNameInput" class="form-control"
                       placeholder="Enter your name"/>
            </div>
            <div class="form-group">
                <label for="emailInput">Email</label>
                <input bind:value={email} type="text" id="emailInput" class="form-control"
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
            <button type="submit" class="btn btn-primary" on:click={signUp}>Sign Up</button>
        </div>
    </div>
</div>
