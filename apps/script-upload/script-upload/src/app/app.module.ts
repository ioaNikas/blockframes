import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Angular Fire
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Akita
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';

// Libraries
import { AuthModule } from '@blockframes/auth';
import { MaterialLayoutModule } from '@blockframes/ui';

// Components
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AuthModule,
    MaterialLayoutModule,
    RouterModule.forRoot([]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    environment.production
      ? []
      : [AkitaNgDevtools.forRoot(), AkitaNgRouterStoreModule.forRoot()],
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
