<template>
<div class="spotify">
  <template v-if="!loading">
    <h3>{{ title }}</h3>
    <div>Lyrics</div>
    <div class="lyric-container">
      <p class="lyric-data">{{currentSong.lyrics}}</p>
    </div>
  </template>
  <div v-else>Loading...</div>
</div>
</template>

<script>
import { reactive, toRefs, onMounted, computed, ref } from '@vue/composition-api'
import * as spotifyServices from '../services/lyrics.svc'

export default {
  setup() {
    const loading = ref(true);
    const currentSong = reactive({
      singerName: '',
      songName: '',
      lyrics: '',
    })

    const title = computed(() => `${currentSong.singerName} - ${currentSong.songName}`)

    async function getCurrentSongLyrics() {
      const ret = await spotifyServices.getCurrentSongLyric();
      currentSong.singerName = ret.singerName
      currentSong.songName = ret.songName
      currentSong.lyrics = ret.lyrics.replace(/\s{,16}/g, '')
    }

    onMounted(() => {
      getCurrentSongLyrics().then(() => loading.value = false);
    })

    return {
      title,
      currentSong,
      loading,
    }
  }
}
</script>

<style lang="scss">
.spotify {
  position: relative;
  width: 100vw;
  margin: 0 auto;
  text-align: left;
  .lyric {
    &-container {
      padding: 0;
    }
    &-data {
      white-space: pre;
      text-align: left;
    }
  }
}
</style>