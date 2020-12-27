<script>
    import { onMount } from 'svelte';
    import {verify} from "../../scripts/accountService";

    export let currentRoute
    export let params = {}

    let confirmed = false

    onMount(() => {
        let verificationCode = currentRoute.namedParams.verificationcode
        let operation = currentRoute.queryParams.operation
        verify(verificationCode, operation, function () {
            confirmed = true
        })
    })
</script>

<div class="container-fluid">
    <div class="row justify-content-md-center">
        {#if confirmed}
            <div class="alert alert-success" role="alert">
                Confirmation success
            </div>
        {:else}
            <div class="alert alert-danger" role="alert">
                Confirmation failed
            </div>
        {/if}
    </div>
</div>