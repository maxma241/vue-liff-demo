import spotifyFetcher, { liffSpotifyApiUriList, BaseApiResult} from './index'
import { AxiosResponse } from 'axios';

interface CurrentPlayingTrackResult {
  singerName: string
  songName: string
  lyrics: string
}
export async function getCurrentSongLyric() {
  const ret = await spotifyFetcher.get<any, AxiosResponse<BaseApiResult<CurrentPlayingTrackResult>>>(liffSpotifyApiUriList.currentPlayingTrack);

  return ret.data.result;
}