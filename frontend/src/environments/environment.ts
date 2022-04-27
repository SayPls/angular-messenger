// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'angularmessenger-87e06',
    appId: '1:532413619498:web:ecd32f2b893706cd85d253',
    storageBucket: 'angularmessenger-87e06.appspot.com',
    apiKey: 'AIzaSyB7SxA0F_6Z27k52j4cVvxJ8hV-qAAzhbY',
    authDomain: 'angularmessenger-87e06.firebaseapp.com',
    messagingSenderId: '532413619498',
    measurementId: 'G-YNW3H8WCJ1',
  },
  apiFakeUrl: 'https://api.chucknorris.io/jokes/random',
  apiUrl: 'https://database-for-my-messanger.herokuapp.com/chats',
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
