// api측 서버만 작성

import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ locals }) {
	// 포켓베이스에 담긴 사용자 인증정보를 지움
	locals.pb.authStore.clear();
	locals.user = null;

	console.log(locals.user);

	throw redirect(303, '/');
}
