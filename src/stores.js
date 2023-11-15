import { writable } from 'svelte/store';

export const params = writable({});
export const user = writable({ loggedIn: false});
export const logoutStore = writable(false)