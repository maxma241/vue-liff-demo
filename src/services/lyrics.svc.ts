import spotifyFetcher, { liffSpotifyApiUriList, BaseApiResult} from './index'
import { AxiosResponse } from 'axios';

interface CurrentPlayingTrackResult {
  singerName: string
  songName: string
  lyrics: string
}
export async function getCurrentSongLyric() {
  const ret = await spotifyFetcher.get<any, AxiosResponse<BaseApiResult<CurrentPlayingTrackResult>>>(liffSpotifyApiUriList.currentPlayingTrack);

  if (!ret.data.success) {
    throw new Error(ret.data.message)
  }

  return ret.data.result;
}

export async function loginToSpotify(userId: string) {
  const ret = await spotifyFetcher.post(liffSpotifyApiUriList.spotifyLogin, { userId });
  return ret.data;
}