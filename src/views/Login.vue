<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <LiffTest /> -->

    <div>
      <div>userId: {{ userId }}</div>
      <div>language: {{ language }}</div>
      <div>version: {{ version }}</div>
      <div>isInClient: {{ isInClient }}</div>
      <div>isLoggedIn: {{ isLoggedIn }}</div>
      <div>os: {{ os }}</div>
      <div>accessToken: {{ accessToken }}</div>
      <div>state: {{ state }}</div>
    </div>
    <div>
      <div>
        <div id="login">
          <div>First, log in to spotify</div>
          <q-btn color="primary" label="Login Spotity" @click="loginSpotify" />
          <!-- <a href="/api/spotify/login">Log in</a> -->
          <!-- <div id="loggedin"></div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { useLiffContext } from '../composition/liff';
import { reactive, onMounted, onBeforeMount, watchEffect } from '@vue/composition-api';
import { loginToSpotify } from '../services/lyrics.svc';
import * as loginCtx from '../composition/login-ctx'

export default {
  name: 'login',
  setup(props, ctx) {
    const liffCtx = useLiffContext();
    const state = reactive({a:123})

    const loginSpotify = async () => {
      try {
        const ret = await loginToSpotify(liffCtx.userId.value);
        window.location.href = ret.result.url;
      } catch (error) {
        console.log(error);
      }
    }

    function handleCallBack() {
      const cbUserId = ctx.root.$route.query.userId;
      console.log(liffCtx.userId.value, cbUserId)
      if (liffCtx.userId.value !== cbUserId) {
        return;
      }
      const expiredIn = ctx.root.$route.query.expiredIn;
      loginCtx.setSpotifyCallbackState({
        userId: liffCtx.userId.value,
        expiredIn,
      });

      ctx.root.$router.replace('/')
    }

    watchEffect(() => {
      handleCallBack();
    }, { flush: 'sync' })
 
    return {
      ...liffCtx,
      state,
      loginSpotify,
    };
  },
};
</script>
