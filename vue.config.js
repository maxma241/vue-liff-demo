module.exports = {
  devServer: {
      disableHostCheck: true,
      proxy: {
        '^/api': {
          target: process.env.VUE_APP_API_URL,
          changeOrigin: true
        },
      }
      // before(app, server, compiler) {
      //   app.get('/login', (req, res) => {
      //     var scopes = 'user-read-private user-read-email';
      //     var fullUrl = req.protocol + '://' + req.get('host') + '/';
      //     console.log('fullUrl: ', fullUrl)
      //     res.redirect('https://accounts.spotify.com/authorize' +
      //       '?response_type=code' +
      //       '&client_id=' + process.env.SPOTIFY_CLIENT_ID +
      //       (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      //       '&redirect_uri=' + encodeURIComponent(fullUrl));
      //     });

      //     app.get('/callback', async (req,res) => {
      //       const { code } = req.query;
      //       console.log(code)
      //       try {
      //         var data = await spotifyApi.authorizationCodeGrant(code)
      //         const { access_token, refresh_token } = data.body;
      //         spotifyApi.setAccessToken(access_token);
      //         spotifyApi.setRefreshToken(refresh_token);
          
      //         res.redirect('http://localhost:3001/home');
      //       } catch(err) {
      //         res.redirect('/#/error/invalid token');
      //       }
      //     });
      // }
  }
}