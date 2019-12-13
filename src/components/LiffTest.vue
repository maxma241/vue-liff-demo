<template>
  <div class="container">
    <button v-if="!isLoggedIn" @click="login">登入</button>
    <button v-else @click="logout">登出</button>
    <button @click="openExternalWindow">開啟外部視窗</button>
    <button @click="closeLIFF">關閉LIFF</button>
    <button @click="openQRCodeScan">開啟QR Code掃描</button>
    <button @click="sendMessage">傳送訊息</button>
    <button @click="getAccessToken">取得AccessToken</button>
    <button @click="getProfile">取得個人資訊</button>
    <button @click="where">這是哪裡</button>

    <pre>{{ qrCodeResult }}</pre>
    <table>
      <tbody v-if="profile">
        <tr>
          <td style="text-aling: center">
            <img :src="profile.pictureUrl" width="100" :alt="profile.displayName" />
          </td>
        </tr>
        <tr>
          <td>{{ profile.userId }}</td>
        </tr>
        <tr>
          <td>{{ profile.displayName }}</td>
        </tr>
        <tr>
          <td>{{ profile.statusMessage }}</td>
        </tr>
      </tbody>
    </table>
    <!-- LIFF DATA -->
    <div id="liffData">
      <h2 id="liffDataHeader" class="textLeft">LIFF Data</h2>
      <table>
        <tr>
          <th>OS</th>
          <td class="textLeft">{{ os }}</td>
        </tr>
        <tr>
          <th>Language</th>
          <td class="textLeft">{{ lang }}</td>
        </tr>
        <tr>
          <th>LIFF SDK Version</th>
          <td class="textLeft">{{ sdkVersion }}</td>
        </tr>
        <tr>
          <th>isInClient</th>
          <td class="textLeft">{{ isInClient }}</td>
        </tr>
        <tr>
          <th>isLoggedIn</th>
          <td class="textLeft">{{ isLoggedIn }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
// import { sendAlertIfNotInClient } from '@/plugins/liff';
// import { fsSVC } from '@/services';

export default {
  data() {
    return {
      os: liff.getOS(),
      sdkVersion: liff.getVersion(),
      lang: liff.getLanguage(),
      isInClient: liff.isInClient(),
      isLoggedIn: liff.isLoggedIn(),

      qrCodeResult: '',
      accessToken: '',
      profile: null,
    };
  },
  methods: {
    login() {
      if (!liff.isLoggedIn()) {
        // set `redirectUri` to redirect the user to a URL other than the front page of your LIFF app.
        liff.login();
      }
    },
    logout() {
      liff.logout();
      this.isLoggedIn = liff.isLoggedIn();
    },
    openExternalWindow() {
      liff.openWindow({
        url: 'https://line.me',
        external: true,
      });
    },
    closeLIFF() {
      if (!liff.isInClient()) {
        // sendAlertIfNotInClient();
        return;
      }

      liff.closeWindow();
    },
    async openQRCodeScan() {
      if (!liff.isInClient()) {
        // sendAlertIfNotInClient();
        return;
      }

      try {
        const ret = await liff.scanCode();
        this.qrCodeResult = JSON.stringify(ret);
      } catch (err) {
        this.qrCodeResult = '掃描失敗:' + err;
      }
    },
    async sendMessage() {
      if (!liff.isInClient()) {
        sendAlertIfNotInClient();
        return;
      }

      try {
        const ret = await liff.sendMessages([
          {
            type: 'text',
            text: "You've successfully sent a message! Hooray!",
          },
        ]);
        alert('訊息已傳送');
      } catch (err) {
        alert('錯誤:' + err);
      }
    },
    getAccessToken() {
      if (!liff.isLoggedIn()) {
        alert('Oops！尚未登入唷');
        return;
      }
      const accessToken = liff.getAccessToken();
      this.accessToken = accessToken;
      alert(accessToken);
    },
    async getProfile() {
      try {
        const profile = await liff.getProfile();
        this.profile = profile;

        fsSVC.postLineInfo({
          profile,
          accessToken: liff.getAccessToken(),
        });
      } catch (err) {
        alert('錯誤:' + err);
      }
    },
    where() {
      window.addEventListener('copy', this.copyHandler);
      document.execCommand('copy');
      window.removeEventListener('copy', this.copyHandler);
      alert('已複製:' + window.location.href);
    },
    copyHandler(e) {
      e.preventDefault();
      e.clipboardData.setData('text/plain', window.location.href);
    },
  },
};
</script>

<style lang="scss" scoped>
.textLeft {
  text-align: left;
}
</style>
