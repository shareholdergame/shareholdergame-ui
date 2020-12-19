<script>
    import {GAME_OPTIONS} from '../../../scripts/constants'

    export let currentRoute
    export let params = {}
</script>

<svelte:head>
    <title>Game Stockholder - Select Game Option</title>
</svelte:head>

<div class="container-fluid">
    <div class="row mb-3 mt-3">
        <div class="col">
            <h2>Select Game Option:</h2>
        </div>
    </div>
    <div class="row">
        {#each Object.entries(GAME_OPTIONS) as [gameOptionName, gameOption]}
            <div class="col-6">
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title display-1">{gameOption.title}</h2>
                        <ul class="card-text">
                            <li>{gameOption.cardOption.major} major cards</li>
                            <li>{gameOption.cardOption.minor} minor cards</li>
                            <li>{gameOption.cardOption.major + gameOption.cardOption.minor} rounds total</li>
                            <li>{gameOption.description}</li>
                        </ul>
                        {#if gameOptionName !== 'game_4x6'}
                            <a href="/secure/newgame/inviteuser/{gameOptionName}" class="btn btn-secondary btn-block">Select</a>
                        {:else}
                            <a href="/secure/newgame/inviteuser/{gameOptionName}" class="btn btn-primary btn-block">Select</a>
                        {/if}
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
