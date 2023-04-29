<script>
    export let data;
</script>
{#if data.profile?.name !== undefined}
<h1>환영합니다, {data.profile?.name}님!</h1>
{:else}
<h1>현재 로그아웃 상태에요!</h1>
{/if}