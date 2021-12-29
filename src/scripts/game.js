import { API_BASE_URL } from './apiUrl'
import { GAME_OPTIONS, GameStatus } from './constants'
import { handleResponse } from './responseHandler'
import {getBearer} from '../auth.js';

export async function startNewGame(gameOption, invitedPlayers, successCallback) {
    let url = API_BASE_URL+ '/game/new'

    let newGameRequest = {
        cardOption: GAME_OPTIONS[gameOption].cardOption,
        invitedPlayers: invitedPlayers,
        playWithComputer: invitedPlayers === null
    }

    let response = await fetch(url, {
        method: 'PUT',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getBearer()
        },
        body: JSON.stringify(newGameRequest)
    })

    handleResponse(response, successCallback)
}

export async function getMyGames(gameOption, gameStatus, parameters, successCallback) {
    let url = API_BASE_URL + '/game/' + gameOption + '/' + gameStatus
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

export async function performInvitationStatusChange(gameId, action, successCallback) {
    let url = API_BASE_URL + '/game/' + gameId + '/invitation?action=' + action

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getBearer()
        }
    })

    handleResponse(response, successCallback)
}

export async function getGameReport(gameId, successCallback) {
    let url = API_BASE_URL + '/game/' + gameId + '/report'

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getBearer()
        }
    })

    handleResponse(response, successCallback)
}

export async function makeTurn(gameId, turn, successCallback) {
    let url = API_BASE_URL + '/game/' + gameId + '/turn'

    let response =  await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getBearer()
        },
        body: JSON.stringify(turn)
    })

    handleResponse(response, successCallback)
}
