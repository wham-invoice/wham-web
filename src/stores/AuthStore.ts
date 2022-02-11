import type { User } from 'firebase/auth';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const user: Writable<User> = writable();
