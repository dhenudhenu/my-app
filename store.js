import { atom } from 'jotai';
export const isAuthenticatedAtom = atom(false); 
export const favouritesAtom = atom([]);
export const searchHistoryAtom = atom([]);
export const userAtom = atom({ username: '', token: '' });