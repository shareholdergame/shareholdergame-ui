import {navigateTo} from 'svelte-router-spa';
import { authenticated, user } from '../stores.js'

export async function handleResponse(response, successCallback) {
    if (response.status === 200) {
        await response.json().then(data => {
            console.log('Request succeeded with JSON response', data)
            if (data.status === 'OK') {
                successCallback(data.body);
            } else {
                alert(data.body.message)
            }
        })
    } else if (response.status === 401) {
        localStorage.removeItem('auth-token')
        localStorage.removeItem('authenticated')
        localStorage.removeItem('user')
        user.set('')
        authenticated.set(false)
        navigateTo('/signin');
    } else {
        // todo
    }
}
