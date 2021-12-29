import {getBearer} from '../auth.js';
import { API_BASE_URL } from './apiUrl'
import { handleResponse } from './responseHandler'

export async function getProfile(successCallback) {
    let url = API_BASE_URL + '/profile'

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getBearer()
        }
    })

    handleResponse(response, successCallback)
}
