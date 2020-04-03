<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <LiffTest /> -->

    <div>
      <div>language: {{ language }}</div>
      <div>version: {{ version }}</div>
      <div>isInClient: {{ isInClient }}</div>
      <div>isLoggedIn: {{ isLoggedIn }}</div>
      <div>os: {{ os }}</div>
      <div>accessToken: {{ accessToken }}</div>
    </div>
    <div>
      <div>
        <div id="login">
          <h1>First, log in to spotify</h1>
          button
          <a href="/api/spotify/login">Log in</a>
          <div id="loggedin"></div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import { useLiffContext } from '../composition/liff';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
  setup() {
    const liffCtx = useLiffContext();

    return {
      ...liffCtx,
    };
  },
};
</script>
