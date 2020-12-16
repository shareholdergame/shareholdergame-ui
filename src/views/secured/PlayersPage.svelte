<script>
    import {onMount} from 'svelte';
    import {getPlayersStatistics} from '../../scripts/player'
    import {GAME_OPTIONS} from "../../scripts/constants";
    import PlayerNameLink from '../../components/PlayerNameLink.svelte'

    export let currentRoute
    export let params = {}

    let playerStatistics = []

    function refreshPlayerStatistics() {
        getPlayersStatistics('game_4x6', {offset: 0, ipp: 20}, function (playerStatisticsResponse) {
            playerStatistics = playerStatisticsResponse.items
        })
    }

    onMount(() => {
        refreshPlayerStatistics()
    })
</script>

<svelte:head>
    <title>Game Stockholder - Players</title>
</svelte:head>

<div class="container-fluid">
    <div class="row mb-3 mt-3">
        <div class="col">
            <h2>Players</h2>
        </div>
    </div>
    <!--<div class="row">
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
            {#each Object.entries(GAME_OPTIONS) as [gameOptionName, gameOption]}
                <label class="btn btn-secondary">
                    <input type="radio" name="options" id="{gameOptionName}"> {gameOption.title}
                </label>
            {/each}
        </div>
    </div>-->
    <div class="row table-responsive">
        <table class="table table-striped">
            <thead>
            <tr>
                <th scope="col">Player</th>
                <th scope="col">Total played</th>
                <th scope="col">Win</th>
                <th scope="col">Draw</th>
                <th scope="col">Bankrupts</th>
                <th scope="col">Win percent</th>
                <th scope="col">Max result</th>
                <th scope="col">Max won sum</th>
                <th scope="col">Total won sum</th>
                <th scope="col">Last play</th>
                <th scope="col">Last visit</th>
            </tr>
            </thead>
            <tbody>
            {#each playerStatistics as playerStat}
                <tr>
                    <th scope="row">
                        <PlayerNameLink name="{playerStat.player.name}"/>
                    </th>
                    <td class="text-center">{playerStat.achievements.totalPlayed}</td>
                    <td class="text-center">{playerStat.achievements.wins}</td>
                    <td class="text-center">{playerStat.achievements.draws}</td>
                    <td class="text-center">{playerStat.achievements.bankrupts}</td>
                    <td class="text-center">{playerStat.achievements.winPercent.toFixed(2)} %</td>
                    <td class="text-right">{playerStat.achievements.maxTotalSum.toLocaleString('en-US')}</td>
                    <td class="text-right">{playerStat.achievements.maxWonSum.toLocaleString('en-US')}</td>
                    <td class="text-right">
                        <span class="{playerStat.achievements.totalWonSum >= 0 ? 'text-success' : 'text-danger'}">
                            {playerStat.achievements.totalWonSum.toLocaleString('en-US')}
                        </span>
                    </td>
                    <td class="text-center">{playerStat.playerSession.lastPlay}</td>
                    <td class="text-center">{playerStat.playerSession.lastVisit}</td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>
