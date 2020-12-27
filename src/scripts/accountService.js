import {API_BASE_URL} from "./constants";
import { handleResponse } from './responseHandler'

export async function checkUserExistence(userNameOrEmail, successCallback) {
    let url = API_BASE_URL+ '/account/exists'

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'text/plain'
        },
        body: userNameOrEmail
    })

    handleResponse(response, successCallback)
}

export async function signUp(accountData, successCallback) {
    let url = API_BASE_URL+ '/account/new'

    let response = await fetch(url, {
        method: 'PUT',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(accountData)
    })

    handleResponse(response, successCallback)
}

export async function verify(verificationCode, operation, successCallback) {
    let url = API_BASE_URL+ '/account/verify/' + verificationCode + '?operation=' + operation

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json'
        }
    })

    handleResponse(response, successCallback)
}
