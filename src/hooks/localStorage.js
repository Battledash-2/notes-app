import { writable } from 'svelte/store';

export function get(key, initial) {
	let store = writable((() => {
		let value = localStorage.getItem(key);
		if (value == null) {
			if (typeof initial === 'function') return initial();
			return initial;
		}
		try {
			return JSON.parse(value);
		} catch {
			return value;
		}
	})());

	let first = false;
	store.subscribe(v => {
		if (first === false) return (first = true);
		localStorage.setItem(key, JSON.stringify(v));
	});

	return store;
}

export default get; // it has hot reload, you don't have to restart it