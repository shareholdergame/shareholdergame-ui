<script>
    import {onMount} from 'svelte';
    import {getPlayersStatistics} from '../../scripts/player'
    import {GAME_OPTIONS} from "../../scripts/constants";
    import PlayerNameLink from '../../components/PlayerNameLink.svelte'
    import Paginator from "../../components/Paginator.svelte"

    export let currentRoute
    export let params = {}

    let total = 0
    let offset = 0
    let itemsPerPage = 10
    let playerStatistics = []

    function refreshPlayerStatistics() {
        getPlayersStatistics('game_4x6', {offset: offset, ipp: itemsPerPage}, function (playerStatisticsResponse) {
            total = playerStatisticsResponse.pagination.itemsCount
            offset = playerStatisticsResponse.pagination.offset
            playerStatistics = playerStatisticsResponse.items
        })
    }

    function onSelectPage(event) {
        offset = parseInt(event.detail.offset)
        itemsPerPage = parseInt(event.detail.ipp)
        refreshPlayerStatistics()
    }

    function convertDaysToDescription(days) {
        if (days === 0) {
            return 'Now'
        } else if (days < 0) {
            return 'Never'
        } else if (days >= 7 && days < 14) {
            return 'A week ago'
        } else if (days >= 14 && days < 30) {
            return 'Two weeks ago'
        } else if (days >= 30 && days < 90) {
            return 'Month ago'
        } else if (days >= 90 && days < 365) {
            return '3 months ago'
        } else if (days >= 365) {
            return 'A year ago'
        } else {
            return days + ' days'
        }
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
                <th class="text-center" scope="col">Player</th>
                <th class="text-center" scope="col">Total played</th>
                <th class="text-center" scope="col">Win</th>
                <th class="text-center" scope="col">Draw</th>
                <th class="text-center" scope="col">Bankrupts</th>
                <th class="text-center" scope="col">Win percent</th>
                <th class="text-center" scope="col">Max result</th>
                <th class="text-center" scope="col">Max won sum</th>
                <th class="text-center" scope="col">Total won sum</th>
                <th class="text-center" scope="col">Last play</th>
                <th class="text-center" scope="col">Last visit</th>
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
                    <td class="text-center">{convertDaysToDescription(playerStat.playerSession.lastPlay)}</td>
                    <td class="text-center">{convertDaysToDescription(playerStat.playerSession.lastVisit)}</td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
    <div class="row justify-content-md-center">
        <Paginator itemsPerPage={itemsPerPage} totalItems={total} offset={offset} on:selectpage={onSelectPage}/>
    </div>
</div>
