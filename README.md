# EdubotApp

Aplicativo para controlar o Edubot através de plataformas móveis.

O aplicativo é construído com base na plataforma Ionic. Para instruções detalhadas de instalação e compilação, recomenda-se consultar a documentação no [Ionic Book](https://ionicframework.com/docs/v1/guide/).

Utilização com o android studio:
```sh
$ git clone https://github.com/Edubot2020/EdubotApp.git
$ npm install
$ ionic cordova run android
```

Publicação da APK Android:
```sh
$ git clone https://github.com/Edubot2020/EdubotApp.git
$ npm install
$ ionic cordova build --release android
$ keytool -genkey -v -keystore edubot-release-key.keystore -alias edubot -keyalg RSA -keysize 2048 -validity 10000
$ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore edubot-release-key.keystore .\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk edubot
$ zipalign -v 4 .\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk EdubotApp.apk
```
