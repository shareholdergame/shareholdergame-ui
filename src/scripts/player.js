import {getBearer} from '../auth.js';
import { API_BASE_URL } from './apiUrl'
import { handleResponse } from './responseHandler'

export async function searchPlayer(parameters, successCallback) {
    let url = API_BASE_URL + '/player'
    if (parameters !== undefined) {
        url = url + '?' + new URLSearchParams(parameters)
    }

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getBearer()
        }
    })

    handleResponse(response, successCallback)
}

export async function getPlayerInfo(playerName, successCallback) {
    let url = API_BASE_URL + '/player/' + playerName

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getBearer()
        }
    })

    handleResponse(response, successCallback)
}

export async function getPlayersStatistics(gameOption, parameters, successCallback) {
    let url = API_BASE_URL + '/player/statistics/' + gameOption
    if (parameters !== undefined) {
        url = url + '?' + new URLSearchParams(parameters)
    }

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getBearer()
        }
    })

    handleResponse(response, successCallback)
}

export async function getPlayerAchievements(playerName, gameOption, parameters, successCallback) {
    let url = API_BASE_URL + '/player/achievements/' + playerName + '/' + gameOption
    if (parameters !== undefined) {
        url = url + '?' + new URLSearchParams(parameters)
    }

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getBearer()
        }
    })

    handleResponse(response, successCallback)
}

export async function getWhoPlaysNow(successCallback) {
    let url = API_BASE_URL + '/player/whoplaysnow'

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getBearer()
        }
    })

    handleResponse(response, successCallback)
}
