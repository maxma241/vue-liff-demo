import axios from 'axios';
import { getUserIdByApp } from '@/composition/login-ctx';

export interface BaseApiResult<T extends any> {
  success: boolean
  status?: string
  message?: string
  result: T
}

export const liffSpotifyApiUriList = {
  spotifyLogin: '/login',
  currentPlayingTrack: '/current-playing-track',
}


export default axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    'User-ID': getUserIdByApp()
  },
})