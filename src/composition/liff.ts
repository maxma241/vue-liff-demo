import { reactive, toRefs } from '@vue/composition-api';


export const initialLIFF = async () => {
  const LIFF = window['liff']
  const liffId = process.env.VUE_APP_LIFF_ID;
  console.log(LIFF, liffId);
  
  try {
    await LIFF.init({
      liffId,
    })
    console.info('LIFF ver.', LIFF.getVersion())
  } catch (err) {
    console.error(err);
  }
}

export const useLiffContext = () => {
  const liffCtx = reactive({
    language: window.liff.getLanguage(),
    version: window.liff.getVersion(),
    isInClient: window.liff.isInClient(),
    isLoggedIn: window.liff.isLoggedIn(),
    os: window.liff.getOS(),
    accessToken: window.liff.getAccessToken(),
  });

  return toRefs(liffCtx);
}

export const sendAlertIfNotInClient = () => {
  alert('這個功能只能在Line裡面使用！');
}
