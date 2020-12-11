import { writable } from 'svelte/store';

const storedAuthenticated = localStorage.getItem('authenticated');
const storedUser = localStorage.getItem('user');

export const authenticated = writable(storedAuthenticated);
export const user = writable(storedUser);

authenticated.subscribe(value => {
    localStorage.setItem('authenticated', value);
})
user.subscribe(value => {
    localStorage.setItem('user', value)
})
