/** @type {import('./$types').Actions} */

import { redirect } from '@sveltejs/kit';

// 폼에서 어떤 액션을 취할때 실행시킬것
export const actions = {
	default: async ({ locals, request }) => {
		// 사용자가 입력한 정보
		const formData = await request.formData();
		// 폼 데이터 자바스크립트 객체로 변환
		const data = Object.fromEntries(formData);

		try {
			await locals.pb.collection('users').create(data);
		} catch (e) {
			console.error(e);
			throw e;
		}

		throw redirect(303, '/login');
	}
};
