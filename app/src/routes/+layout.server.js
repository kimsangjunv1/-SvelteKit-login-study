// 모든 페이지에서 보여지기 때문에 이곳엔 모든 페이지에 보여지는 부분을 설정
/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
	// hooks안에 있는 event.locals.user 있으면
	if (locals.user) {
		return {
			profile: locals.user
		};
	}
}
