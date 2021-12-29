import { API_BASE_URL } from './apiUrl'
import { handleResponse } from './responseHandler'
import {getBearer} from '../auth.js';

export async function getMessages(successCallback) {
    let url = API_BASE_URL + '/queue'

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getBearer()
        }
    })

    handleResponse(response, successCallback)
}
