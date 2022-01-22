<script>
    import {onMount} from 'svelte';
    import {getPlayersStatistics} from '../../scripts/player'
    import {GAME_OPTIONS} from "../../scripts/constants";
    import PlayerNameLink from '../../components/PlayerNameLink.svelte'
    import Paginator from "../../components/Paginator.svelte"
    import UserNameFilter from "../../components/UserNameFilter.svelte"

    export let currentRoute
    export let params = {}

    let total = 0
    let playerStatistics = []
    let selectedGameOption = 'game_4x6'
    let parameters = {
        offset: 0,
        ipp: 10,
        playerNamePrefix: ''
    }

    function refreshPlayerStatistics() {
        getPlayersStatistics(selectedGameOption, parameters, function (playerStatisticsResponse) {
            total = playerStatisticsResponse.pagination.itemsCount
            parameters.offset = playerStatisticsResponse.pagination.offset
            playerStatistics = playerStatisticsResponse.items
        })
    }

    function onSelectPage(event) {
        parameters.offset = parseInt(event.detail.offset)
        parameters.ipp = parseInt(event.detail.ipp)
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

    function onSelectGameOption() {
        refreshPlayerStatistics()
    }

    function onFilterByUserName(event) {
        parameters.playerNamePrefix = event.detail
        refreshPlayerStatistics()
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
    <div class="row mb-3 mt-3 pl-3">
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
            {#each Object.entries(GAME_OPTIONS) as [gameOptionName, gameOption]}
                <label class="btn btn-outline-secondary {selectedGameOption === gameOptionName ? 'active' : ''}">
                    <input type="radio" name="selectedGameOption" id="{gameOptionName}_id"
                           bind:group={selectedGameOption} value={gameOptionName} on:change={onSelectGameOption}> {gameOption.title}
                </label>
            {/each}
        </div>
        <div class="col-sm-4 d-inline-flex">
            <UserNameFilter on:filterByUserName={onFilterByUserName}/>
        </div>
    </div>
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
        <Paginator itemsPerPage={parameters.ipp} totalItems={total} offset={parameters.offset} on:selectpage={onSelectPage}/>
    </div>
</div>
