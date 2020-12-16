<script>
    import { onMount } from 'svelte'
    import { getGameReport, makeTurn } from '../../scripts/game'
    import {getCurrentPosition} from '../../scripts/playGamePageMediator'
    import GameHeader from '../../components/GameHeader.svelte'
    import PositionPanel from '../../components/PositionPanel.svelte'
    import RoundsList from '../../components/RoundsList.svelte'
    import TurnForm from '../../components/TurnForm.svelte'
    import CardSetPanel from '../../components/CardSetPanel.svelte'
    import ResultPanel from '../../components/ResultPanel.svelte'
    import {GameStatus} from '../../scripts/constants'

    export let currentRoute
    export let params = {}

    let gameSet = {}
    let options = {}
    let players = []
    let games = []
    let game = {}
    let rounds = []
    let currentPosition = {}
    let roundsNumber = 0

    let positionPanel
    let turnForm

    function refreshGameReport() {
        let gameId = parseInt(currentRoute.namedParams.gameid)
        getGameReport(gameId, function (_gameSet) {
            console.log(JSON.stringify(_gameSet))
            gameSet = _gameSet
            games = gameSet.games
            players = gameSet.players
            options = gameSet.options
            for (const _game of games) {
                if (_game.id === gameId) {
                    game = _game
                }
            }
            if (game.id !== undefined) {
                rounds = game.rounds
                if (game.status === GameStatus.RUNNING) {
                    currentPosition = getCurrentPosition(game)
                }
            } else {
                console.log('ERROR!') //todo - remove it
            }
            roundsNumber = options.cardOption.major + options.cardOption.minor
        })
    }

    onMount(() => {
        refreshGameReport();
    })

    function updatePosition(event) {
        positionPanel.updateCurrentPosition(currentPosition)
    }

    function onDoTurn(event) {
        let gameId = parseInt(currentRoute.namedParams.gameid)
        makeTurn(gameId, event.detail, function () {
            refreshGameReport()
        })
    }
</script>

<svelte:head>
    <title>Game Stockholder - Game</title>
</svelte:head>

<div class="container-fluid">
    <div class="row pt-3 pb-3">
        <div class="col-md-4 text-center align-middle">
            <GameHeader options="{options}" game="{game}"/>
        </div>
        <div class="col-md-8">
            {#if game.status === GameStatus.RUNNING}
                <PositionPanel bind:this={positionPanel} currentPosition="{currentPosition}"/>
            {:else if game.status === GameStatus.FINISHED}
                <ResultPanel gameSet="{gameSet}"/>
            {/if}
        </div>
    </div>
    <RoundsList rounds="{rounds}"/>
    {#if currentPosition.myTurnOrder === currentPosition.currentTurn && game.status === GameStatus.RUNNING}
        <TurnForm bind:this={turnForm} currentPosition={currentPosition} roundsNumber={roundsNumber}
                  on:cardapplied={updatePosition} on:resetcard={updatePosition}
                  on:buysell={updatePosition} on:reset={updatePosition} on:doturn={onDoTurn}/>
    {/if}
    <CardSetPanel players="{game.players}"/>
</div>
