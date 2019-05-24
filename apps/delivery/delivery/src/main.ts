import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { persistState } from '@datorama/akita';
import { LocalStorageVault } from 'libs/ethers/src/lib/vault/vault';

// ethereum private keys storage
persistState({
  include: ['key'],
  storage: LocalStorageVault
});

// TODO uncomment this one day
// persistState({
//   exclude: ['router', 'key'],
//   key: 'delivery'
// });

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
