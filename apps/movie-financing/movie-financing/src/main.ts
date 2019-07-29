import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { enableAkitaProdMode } from '@datorama/akita';
import { hmrBootstrap } from './hmr';
import { MovieFinancingAppModule } from './app/movie-financing.app.module';

const bootstrap = () => platformBrowserDynamic().bootstrapModule(MovieFinancingAppModule);

// persistState({ // TODO UNCOMENT THAT DURING THE REFACTORING AFTER CANNES
//   exclude: ['router'],
//   key: 'movie-financing'
// });

// Production Environment
if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
}

// Hot Module Reload Envionment
if (environment.hmr) {
  if (module['hot']) {
    hmrBootstrap(module, bootstrap);
  } else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap().catch(err => console.log(err));
}
