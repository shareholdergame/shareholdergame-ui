import { authenticated, user } from './stores.js'
import { API_BASE_URL } from './scripts/constants'

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
        setUserData(result.access_token, username)
    }

    successCallback();
}

function setUserData(accessToken, username) {
    localStorage.setItem('auth-token', accessToken)
    localStorage.setItem('authenticated', true)
    localStorage.setItem('user', username)
    authenticated.set(true)
    user.set(username)
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
