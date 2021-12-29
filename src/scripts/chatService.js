import {API_BASE_URL} from "./apiUrl";
import { handleResponse } from './responseHandler'
import {getBearer} from '../auth.js';

export async function getChats(successCallback) {
    let url = API_BASE_URL + '/chat'
    url = url + '?' + new URLSearchParams({offset: 0, ipp: 100})

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': getBearer()
        }
    })

    handleResponse(response, successCallback)
}

export async function getMessages(chatId, msgCount, successCallback) {
    let url = API_BASE_URL + '/chat/' + chatId
    url = url + '?' + new URLSearchParams({offset: 0, ipp: msgCount})

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': getBearer()
        }
    })

    handleResponse(response, successCallback)
}

export async function sendChatMessage(newChatMessage, successCallback) {
    let url = API_BASE_URL + '/chat/send'

    let response = await fetch(url, {
        method: 'PUT',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getBearer()
        },
        body: JSON.stringify(newChatMessage)
    })

    handleResponse(response, successCallback)
}

export async function markAsRead(messageIds, successCallback) {
    let url = API_BASE_URL + '/chat/markasread'
    url = url + '?' + new URLSearchParams({messageIds: messageIds})

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getBearer()
        }
    })

    handleResponse(response, successCallback)
}
