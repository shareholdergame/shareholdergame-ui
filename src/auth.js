import { authenticated, user } from './stores.js'
import { API_BASE_URL } from './scripts/constants'
import {navigateTo} from "svelte-router-spa";
import {handleResponse} from "./scripts/responseHandler";

export async function authenticate(username, password, successCallback) {
    let url = API_BASE_URL + '/oauth/token'
        + '?grant_type=password&username=' + username + '&' + 'password=' + password;
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json'
        }
    })

    if (response.status === 200) {
        let result = await response.json()
        setUserData(result.access_token)
        await getAccountDetails(function (accountDetails) {
            localStorage.setItem('user', accountDetails.userName)
            user.set(accountDetails.userName)
        })
    }

    successCallback();
}

export async function logout() {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('authenticated')
    localStorage.removeItem('user')
    user.set('')
    authenticated.set(false)
    navigateTo('/');
}

function setUserData(accessToken) {
    localStorage.setItem('auth-token', accessToken)
    localStorage.setItem('authenticated', true)
    authenticated.set(true)
}

export function getBearer() {
    let authToken = localStorage.getItem('auth-token')
    return authToken !== undefined && authToken !== null ? 'Bearer ' + authToken : ''
}

let userName = ''

user.subscribe(value => {
    userName = value
})

export function isMe(name) {
    return userName.toLowerCase() === name.toLowerCase()
}

async function getAccountDetails(successCallback) {
    let url = API_BASE_URL+ '/account'

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getBearer()
        }
    })

    handleResponse(response, successCallback)
}
