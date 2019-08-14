export const production = true;
export const hmr = false;

export const persistenceSettings = {
  // TODO : change to synchronizeTabs when available (angularFire 5.2)
  experimentalTabSynchronization: true
};

// Analytics
// =========

export const sentryDsn = 'https://2ef084dd8ff947e0943115d949f3adcf@sentry.io/1501525';

// Firebase
// ========

export const appUrl = 'https://app.blockframes.io';

export const firebase = {
  apiKey: 'AIzaSyCcUEsNlBgusJtyYAawoJAshnnHBruM1ss',
  authDomain: 'blockframes.firebaseapp.com',
  databaseURL: 'https://blockframes.firebaseio.com',
  projectId: 'blockframes',
  storageBucket: 'blockframes.appspot.com',
  messagingSenderId: '1080507348015'
};

// Algolia
// =======

export const algolia = {
  appId: 'W5ACHF3Z7Z',
  searchKey: '102e09194402cf082527d84476c5fc25',
  indexNameOrganizations: 'orgs'
};

// Ethereum
// ========

export const network = 'goerli';
export const mnemonic = ''; // defined in functions.config, see backend-functions/environments
export const baseEnsDomain = 'blockframes.test';
export const factoryContract = 'factory2.eth';

// TODO : change the address
export const contracts = {
  ipHash: '0x6f77765b18deac65dc55c3a38a112c9583e25185',
  testErc1077: '0x758011e12E57a81f93D1e59AdF8867463349A54d',
  ensResolver: '0xc1EA41786094D1fBE5aded033B5370d51F7a3F96'
};

export const relayer = {
  registryAddress: '0x112234455c3a32fd11230c42e7bccd4a84e02010',
  resolverAddress: '0xc1EA41786094D1fBE5aded033B5370d51F7a3F96',
  network,
  baseEnsDomain,
  factoryContract
};

// Functions
// =========

export const backupBucket = 'prod-backups';
export const sendgridAPIKey = ''; // defined in functions.config, see backend-functions/environments
