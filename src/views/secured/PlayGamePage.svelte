<script>
    import Modal from "sv-bootstrap-modal"
    import {currentPath, reloadPage, gameIds} from "../../stores";
    import { getGameReport, makeTurn } from '../../scripts/game'
    import {getCurrentPosition} from '../../scripts/playGamePageMediator'
    import GameHeader from '../../components/GameHeader.svelte'
    import PositionPanel from '../../components/PositionPanel.svelte'
    import RoundsList from '../../components/RoundsList.svelte'
    import TurnForm from '../../components/TurnForm.svelte'
    import CardSetPanel from '../../components/CardSetPanel.svelte'
    import ResultPanel from '../../components/ResultPanel.svelte'
    import {GameStatus} from '../../scripts/constants'
    import { Navigate } from 'svelte-router-spa'

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

    let isOpen = false
    let positionPanel
    let turnForm
    let resultForForum = ''

    $: {
        if ($reloadPage) {
            console.log('Reload page PlayGamePage')
            let gameId = parseInt(currentRoute.namedParams.gameid)
            for (const id of $gameIds) {
                if (id === gameId) {
                    refreshGameReport(gameId);
                }
            }
            reloadPage.set(false)
        }
    }

    $: {
        if (game.id === undefined || parseInt(currentRoute.namedParams.gameid) !== game.id) {
            currentPath.set(currentRoute.path)
            refreshGameReport(parseInt(currentRoute.namedParams.gameid));
        }
    }

    function refreshGameReport(gameId) {
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
                    currentPosition = getCurrentPosition(game, options)
                }
            } else {
                console.log('ERROR!') //todo - remove it
            }
            roundsNumber = options.cardOption.major + options.cardOption.minor
        })
    }

    function updatePosition(event) {
        positionPanel.updateCurrentPosition(currentPosition)
    }

    function onDoTurn(event) {
        let gameId = parseInt(currentRoute.namedParams.gameid)
        makeTurn(gameId, event.detail, function () {
            refreshGameReport(gameId)
        })
    }

    function onGameReport(event) {
        let gameId = parseInt(event.detail)
        refreshGameReport(gameId)
    }

    function onResultForForumClick(event) {
        isOpen = true
        resultForForum = '[table][tr][th colspan=' + (game.players.length + 1) + ']'
        for (const player of players) {
            resultForForum += player.player.name
            resultForForum += ' - '
        }
        resultForForum += options.cardOption.major + ' x ' + options.cardOption.minor
        resultForForum += '[/th][/tr]'
        for (const _game of games) {
            if (_game.status === GameStatus.FINISHED) {
                resultForForum += '[tr][td] Партия ' + _game.letter + ' [/td]'
                for (const _result of _game.result) {
                    resultForForum += '[td][b]' + _result.result.name + '[/b] - ' + _result.result.totalFunds + '[/td]'
                }
                resultForForum += '[/tr]'
            }
        }
        resultForForum += '[tr][td] Результат игры [/td]'
        for (const _result1 of gameSet.result) {
            resultForForum += '[td][b]' + _result1.name + ' \n' + _result1.totalPoints + '[/b]'
            if (_result1.fundsDifference > 0) {
                resultForForum += '(+' + _result1.fundsDifference + ')'
            }
            resultForForum += '[/td]'
        }
        resultForForum += '[/tr]'
        resultForForum += '[/table]'
    }

    function onCopyAndClose(event) {
        isOpen = false;
        let copyText = document.getElementById("resultForForumArea");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);
    }

    function onCopyReport() {
        navigator.clipboard.writeText(JSON.stringify(currentPosition));
    }
</script>

<svelte:head>
    <title>Game Stockholder - Game</title>
</svelte:head>

<div class="container-fluid">
    <div class="row pt-3 pb-3">
        <div class="col-sm-4 text-center align-middle">
            <GameHeader options="{options}" game="{game}"/>
            {#if gameSet.games !== undefined}
                {#each gameSet.games as _game}
                    {#if _game.letter !== game.letter}
                        <Navigate to="/secure/playgame/{_game.id}">Game {_game.letter}</Navigate>
                    {/if}
                {/each}
            {/if}
        </div>
        <div class="col-sm-6">
            {#if game.status === GameStatus.RUNNING}
                <PositionPanel bind:this={positionPanel} currentPosition="{currentPosition}"/>
            {:else if game.status === GameStatus.FINISHED}
                <ResultPanel gameSet="{gameSet}" on:gamereport={onGameReport}/>
                <button class="btn btn-info" on:click={onResultForForumClick}>Result for Forum</button>
            {/if}
        </div>
        <div class="col-sm-2"></div>
    </div>
    <RoundsList rounds="{rounds}"/>
    {#if currentPosition.myTurnOrder === currentPosition.currentTurn && game.status === GameStatus.RUNNING}
        <TurnForm bind:this={turnForm} currentPosition={currentPosition} roundsNumber={roundsNumber}
                  on:cardapplied={updatePosition} on:resetcard={updatePosition}
                  on:buysell={updatePosition} on:reset={updatePosition} on:doturn={onDoTurn}/>
    {/if}
    <CardSetPanel players="{game.players}" gameStatus="{game.status}"/>
    <div class="row pt-3 pb-3">
        <div class="col-sm-4">
        </div>
        <div class="col-sm-4">
            <button type="button" class="btn btn-secondary btn-sm btn-block" on:click={onCopyReport}>Copy Game Report in JSON Format</button>
        </div>
        <div class="col-sm-4">
        </div>
    </div>
</div>

<Modal bind:open={isOpen}>
    <div class="modal-header">
        <h5 class="modal-title">Export Game Set Result in Forum Format</h5>
        <button type="button" class="close" on:click={() => (isOpen = false)}>
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        <form>
            <label for="resultForForumArea">Game Set Result</label>
            <textarea class="form-control" id="resultForForumArea" cols="100" rows="10">{resultForForum}</textarea>
        </form>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-primary" on:click={onCopyAndClose}>Copy to clipboard and Close</button>
    </div>
</Modal>
