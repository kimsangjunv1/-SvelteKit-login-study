/** @type {import('./$types').Actions} */

import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */

// 로그인 상태에서 회원가입 막기
export async function load({ locals }) {
	if (locals.pb.authStore.isValid) {
		throw redirect(303, '/');
	}
}

// 폼에서 어떤 액션을 취할때 실행시킬것
export const actions = {
	default: async ({ locals, request }) => {
		// 사용자가 입력한 정보
		const formData = await request.formData();
		// 폼 데이터 자바스크립트 객체로 변환
		const data = Object.fromEntries(formData);

		try {
			// authWithPassword를 통해 토근이나 데이터를 제대로 갖고 있는지 확인
			await locals.pb.collection('users').authWithPassword(data.email, data.password);
		} catch (e) {
			console.error(e);
			throw e;
		}

		throw redirect(303, '/');
	}
};
