import moment from 'moment';

const userIdKey = 'liff-spotify-user-id';
const spotifyLoginKey = 'slk'

export function randomId(): string {
  const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
  return uint32.toString(16);
}

export function getUserIdByApp(): string | null {
  return window.localStorage.getItem(userIdKey);
}

export function setAppUserId(userId: string) {
  window.localStorage.setItem(userIdKey, userId);
}

export function checkIsLogin(): boolean {
  const spotifyStatusString = window.localStorage.getItem(spotifyLoginKey)
  if (!spotifyStatusString) {
    return false
  }
  
  const spotifyState: SpotifyCallbackVM = JSON.parse(spotifyStatusString)

  if (moment(spotifyState.expiredIn).isBefore(moment())) {
    window.localStorage.removeItem(spotifyLoginKey)
    return false;
  }

  return true;
}

export function setSpotifyCallbackState(state: SpotifyCallbackVM) {
  console.log(`set ${spotifyLoginKey}: ${JSON.stringify(state)}`)
  window.localStorage.setItem(spotifyLoginKey, JSON.stringify(state))
}

interface SpotifyCallbackVM {
  userId: string
  expiredIn: Date
}