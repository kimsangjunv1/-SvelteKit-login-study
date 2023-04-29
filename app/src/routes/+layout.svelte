<script>
  export let data;
</script>
<div class="container">
    <nav>
        <ul>
          <li><a href="/">Brand</a></li>
        </ul>
        <ul>
          {#if data?.profile}
          <!-- {#if data !== undefined} -->
            <li>
              <form action="/logout" method="post">
                <button>로그아웃</button>
              </form>
            </li>
          {:else}
          <li><a href="/login">로그인</a></li>
          <li><a href="/register">회원가입</a></li>
          {/if}
          <!-- <li><a href="#" role="button">Button</a></li> -->
        </ul>
      </nav>
      <slot />
</div>