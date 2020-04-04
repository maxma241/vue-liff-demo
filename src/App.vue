<template>
  <div id="app">
    <template v-if="!isLogin">
      <h2>Login with spotify</h2>
    </template>
    <template v-else>
      <div id="nav">
        <router-link to="/">home</router-link>|
        <router-link to="/about">About</router-link>
      </div>
    </template>
    <div v-if="isLiffReady">
      <router-view />
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref, reactive, watchEffect, watch } from "@vue/composition-api";
import { initialLIFF } from "./composition/liff";
import { checkIsLogin } from "./composition/login-ctx";

export default {
  setup(props, ctx) {
    const isLiffReady = ref(false);

    initialLIFF().then(() => {
      isLiffReady.value = true;
    });

    const isLogin = ref(false);

    watch(() => ctx.root.$route, () => {
      isLogin.value = checkIsLogin();
    })

    return {
      isLiffReady,
      isLogin
    };
  }
};
</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
