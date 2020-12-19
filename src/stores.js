import { writable } from 'svelte/store';

console.log('authenticated value in storage = ' + localStorage.getItem('authenticated'))

const storedAuthenticated = localStorage.getItem('authenticated') !== null ? localStorage.getItem('authenticated') : false;
const storedUser = localStorage.getItem('user') !== null ? localStorage.getItem('user') : '';

export const authenticated = writable(storedAuthenticated);
export const user = writable(storedUser);
export const currentPath = writable('/')
export const notifications = writable([])
