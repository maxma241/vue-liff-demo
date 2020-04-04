import { reactive, toRefs, onMounted } from '@vue/composition-api';
import { getUserIdByApp, randomId, setAppUserId } from './login-ctx';


export const initialLIFF = async () => {
  const LIFF = window['liff']
  const liffId = process.env.VUE_APP_LIFF_ID;
  console.log(LIFF, liffId);
  
  try {
    await LIFF.init({
      liffId,
    })
    console.info('LIFF ver.', LIFF.getVersion())
    return true;
  } catch (err) {
    console.error(err);
  }
}

export const useLiffContext = () => {
  const liffCtx = reactive({
    userId: '',
    language: window.liff.getLanguage(),
    version: window.liff.getVersion(),
    isInClient: window.liff.isInClient(),
    isLoggedIn: window.liff.isLoggedIn(),
    os: window.liff.getOS(),
    accessToken: window.liff.getAccessToken(),
  });

  onMounted(() => {
    if (liffCtx.isInClient) {
      liffCtx.userId = window.liff?.getProfile()?.userId;
    } else {
      let userId = getUserIdByApp();
      if (!userId) {
        userId = randomId()
        setAppUserId(userId)
      }
      liffCtx.userId = userId;
    }
  })

  return toRefs(liffCtx);
}

export const sendAlertIfNotInClient = () => {
  alert('這個功能只能在Line裡面使用！');
}
