import { pb } from '$lib/pocketbase';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	// before response (서버 다녀오기 전에 행하고 싶은 것들)

	// 후킹(토큰 삽입) 완료후 서버로 보낸다음에 서버에서 받아온 값이 response
	// new PocketBase("http://127.0.0.1:8090"); 역할을 pb에서 import 해온것으로 대체
	// event.locals 라는 서버가 접근 가능한 저장소
	// app.d.ts 에서 타입을 명시해주지 않으면 pb 부분에서 오류 뜸
	event.locals.pb = pb;

	// 쿠키를 이용한 정보 세팅
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	// 시도
	try {
		// get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
		event.locals.pb.authStore.isValid && (await event.locals.pb.collection('users').authRefresh());
		// 에러 발생시
	} catch (_) {
		// clear the auth store on failed refresh
		event.locals.pb.authStore.clear();
	}

	// 종류 : token(string), model(record), isValid(boolean)
	// pb : 포켓베이스 안 authStore : 인증 안 model : 모델 선택
	// 서버가 접근 가능한 공간 event.locals 의 user에다가 저장
	event.locals.user = structuredClone(pb.authStore.model);

	const response = await resolve(event);

	// after response (서버 다녀온 후 행하고 싶은 것들)

	// 토큰 정보를 클라이언트에게 전송
	response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());

	return response;
}
