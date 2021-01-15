<script>
    import { authenticated } from '../../stores.js'

    export let currentRoute
    export let params = {}
</script>

<svelte:head>
    <title>Game Stockholder</title>
</svelte:head>

<div class="intro-header">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="intro-message mx-auto">
                    <h1>Онлайн-игра "Акционер"</h1>
                    <p class="text-justify">Эта игра – нечто среднее между шахматами и покером. Она, как шахматы, заставляет игрока думать на несколько ходов вперед и, как покер,
                        побуждает его идти на риск, предвосхищая успех.
                        Игра «Акционер» требует хладнокровия в ситуации, когда вас загнали в угол и щекочет нервы в ожидании хода соперника. Она дарит радость побед и учит стойко
                        переносить горечь поражений.</p>
                    <hr class="intro-divider">
                    <a href="/secure/home" class="btn btn-primary btn-lg active" style="width: 200px" role="button" aria-pressed="true">Play</a>
                    {#if !$authenticated}
                        <a href="/signup" class="btn btn-secondary btn-lg active" style="width: 200px" role="button" aria-pressed="true">Sign Up</a>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>
