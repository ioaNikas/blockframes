import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { movieFinancingRoutes } from './app-routing-module';

// Components
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { FinancingExplorerHomeComponent } from './explorer/home/home.component';
import { FinancingExplorerDetailsComponent } from './explorer/details/details.component';
import { FinancingExplorerSearchComponent } from './explorer/search/search.component';
import { FinancingMovieCardComponent } from './explorer/movie-card/movie-card.component';
import { FinancingExplorerFooterComponent } from './explorer/footer/footer.component';
import { FinancingExplorerHeaderComponent } from './explorer/header/header.component';
import { FinancingExplorerNavbarComponent } from './explorer/navbar/navbar.component';
import { FinancingExplorerFinancingDetailsComponent } from './explorer/financing-details/financing-details.component';
import { FinancingExplorerMovieHomeComponent } from './explorer/movie-home/movie-home.component';
import { FinancingExplorerProfileComponent } from './explorer/profile/profile.component';
import { FinancingMovieCardHorizontalComponent } from './explorer/movie-card-horizontal/movie-card-horizontal.component';
import { FinancingExplorerCompareComponent } from './explorer/compare/compare.component';

// Akita
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';

// AngularFire
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// Material
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';

// Librairies
import { FinancingRangeSliderModule } from './explorer/ui/range-slider/range-slider.module';
import { ToolbarModule } from '@blockframes/ui';
import { MovieModule } from '@blockframes/movie';
import { AuthModule } from '@blockframes/auth';
import { FlexModule } from '@angular/flex-layout';
import { AngularFullpageModule } from '@fullpage/angular-fullpage';
import { UtilsModule } from '@blockframes/utils';
import { AccountModule, ProfileModule } from '@blockframes/account';
import { WalletModule, KeyManagerModule } from '@blockframes/ethers';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    FinancingExplorerHomeComponent,
    FinancingExplorerDetailsComponent,
    FinancingExplorerSearchComponent,
    FinancingMovieCardComponent,
    FinancingMovieCardHorizontalComponent,
    FinancingExplorerFooterComponent,
    FinancingExplorerHeaderComponent,
    FinancingExplorerFinancingDetailsComponent,
    FinancingExplorerNavbarComponent,
    FinancingExplorerMovieHomeComponent,
    FinancingExplorerProfileComponent,
    FinancingExplorerCompareComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MovieModule,
    RouterModule,
    AuthModule,
    ToolbarModule,
    AccountModule,
    ProfileModule,
    UtilsModule,
    WalletModule,
    KeyManagerModule,

    // Akita
    AkitaNgRouterStoreModule.forRoot(),
    environment.production ? [] : [AkitaNgDevtools.forRoot()],
    AngularFireFunctionsModule,
    AngularFirestoreModule.enablePersistence(environment.persistenceSettings),
    FlexModule,

    // Fullpage (homepage)
    AngularFullpageModule,
    MatProgressBarModule,
    FinancingRangeSliderModule,
    MatMenuModule,

    RouterModule.forRoot(movieFinancingRoutes, {
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      paramsInheritanceStrategy: 'always'
    })
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR'
    }
  ],
  bootstrap: [AppComponent]
})
export class MovieFinancingAppModule {}
