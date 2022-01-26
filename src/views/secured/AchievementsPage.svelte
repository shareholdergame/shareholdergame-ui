<script>
    import { onMount } from 'svelte';
    import {isMe} from '../../auth.js';
    import {getPlayerInfo, getPlayerAchievements} from "../../scripts/player";
    import {GAME_OPTIONS} from "../../scripts/constants";
    import PlayerNameLink from '../../components/PlayerNameLink.svelte'
    import Paginator from "../../components/Paginator.svelte"

    export let currentRoute
    export let params = {}

    let player
    let total = 0
    let achievements = []

    let selectedGameOption = 'game_4x6'
    let parameters = {
        offset: 0,
        ipp: 10
    }

    $: {
        if (player === undefined || player.player.name !== currentRoute.namedParams.playername) {
            refreshPage()
        }
    }

    function refreshPage() {
        if (!isMe(currentRoute.namedParams.playername)) {
            getProfileData()
        }
        getAchievements()
    }

    function onSelectGameOption() {
        refreshPage()
    }

    function getProfileData() {
        getPlayerInfo(currentRoute.namedParams.playername, function (value) {
            player = value
        })
    }

    function getAchievements() {
        getPlayerAchievements(currentRoute.namedParams.playername, selectedGameOption, parameters, function (data) {
            total = data.pagination.itemsCount
            parameters.offset = data.pagination.offset
            achievements = data.items
        })
    }

    function onSelectPage(event) {
        parameters.offset = parseInt(event.detail.offset)
        parameters.ipp = parseInt(event.detail.ipp)
        getAchievements()
    }

    onMount(() => {
        //refreshPage()
    })
</script>

<svelte:head>
    <title>Game Stockholder - Achievements</title>
</svelte:head>

<div class="container-fluid">
    <div class="row mb-3 mt-3">
        <div class="col">
            {#if isMe(currentRoute.namedParams.playername)}
                <h2>My Achievements</h2>
            {:else}
                {#if player !== undefined}
                    <h2>{player.player.name}</h2>
                {/if}
            {/if}
        </div>
    </div>
    {#if !isMe(currentRoute.namedParams.playername)}
        <div class="row pl-3 mb-3 mt-3">
            {#if player !== undefined && player.location !== undefined}
                <h4>
                    {#if player.location.city !== undefined && player.location.city !== null}
                        {player.location.city},&nbsp;
                    {/if}
                    {#if player.location.stateProvince !== undefined && player.location.stateProvince !== null}
                        {player.location.stateProvince},&nbsp;
                    {/if}
                    {#if player.location.country !== undefined && player.location.country !== null}
                        {player.location.country}
                    {/if}
                </h4>
            {/if}
        </div>
    {/if}

    <div class="row mb-3 mt-3 pl-3">
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
            {#each Object.entries(GAME_OPTIONS) as [gameOptionName, gameOption]}
                <label class="btn btn-outline-secondary {selectedGameOption === gameOptionName ? 'active' : ''}">
                    <input type="radio" name="selectedGameOption" id="{gameOptionName}_id"
                           bind:group={selectedGameOption} value={gameOptionName} on:change={onSelectGameOption}> {gameOption.title}
                </label>
            {/each}
        </div>
    </div>
    <div class="row table-responsive">
        <table class="table table-striped">
            <thead>
            <tr>
                <th class="text-center" scope="col">Player</th>
                <th class="text-center" scope="col">Total Played</th>
                <th class="text-center" scope="col">Win</th>
                <th class="text-center" scope="col">Positive Draw</th>
                <th class="text-center" scope="col">Negative Draw</th>
                <th class="text-center" scope="col">Lose</th>
                <th class="text-center" scope="col">Max result</th>
                <th class="text-center" scope="col">Max won sum</th>
                <th class="text-center" scope="col">Total won sum</th>
            </tr>
            </thead>
            <tbody>
            {#each achievements as achievement}
                <tr>
                    <th scope="row">
                        <PlayerNameLink name="{achievement.player.name}"/>
                    </th>
                    <td class="text-center">{achievement.totalPlayed}</td>
                    <td class="text-center">{achievement.winsCount}</td>
                    <td class="text-center">{achievement.positiveDrawsCount}</td>
                    <td class="text-center">{achievement.negativeDrawsCount}</td>
                    <td class="text-center">{achievement.losesCount}</td>
                    <td class="text-center">{achievement.maxResult.toLocaleString('en-US')}</td>
                    <td class="text-center">{achievement.maxWon.toLocaleString('en-US')}</td>
                    <td class="text-right">
                        <span class="{achievement.totalDiff >= 0 ? 'text-success' : 'text-danger'}">
                            {achievement.totalDiff.toLocaleString('en-US')}
                        </span>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
    <div class="row justify-content-md-center">
        <Paginator itemsPerPage={parameters.ipp} totalItems={total} offset={parameters.offset} on:selectpage={onSelectPage}/>
    </div>

</div>
