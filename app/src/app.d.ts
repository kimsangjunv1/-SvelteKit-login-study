// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			// 포켓베이스 타입은 default
			pb: import('pocketbase').default;
			// 포켓베이스 타입은 authstore의 model
			user: import('pocketbase').default['authStore']['model'];
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
