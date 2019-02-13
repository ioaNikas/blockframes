// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hmr: true,
  firebase: {
    apiKey: "AIzaSyD1qjU9feHzxAFg96L4VouE9_nt9nFGg0s",
    authDomain: "blockframes-francois.firebaseapp.com",
    databaseURL: "https://blockframes-francois.firebaseio.com",
    projectId: "blockframes-francois",
    storageBucket: "blockframes-francois.appspot.com",
    messagingSenderId: "309694417970"
  },
  network: 'ropsten' as 'ropsten',
  contracts: {
    ipHash: '0x6f77765b18deac65dc55c3a38a112c9583e25185'
  },
  pubsub: {
    projectID: 'blockframes-francois',
    topicRootName: 'eth-events'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
