import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

// Akita
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';

// Angular Fire
import { AngularFireModule } from '@angular/fire';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// Libraries
import { AuthModule } from '@blockframes/auth';
import { UiFormModule, UploadModule, ToolbarModule } from '@blockframes/ui';
import { MovieModule } from '@blockframes/movie';
import { OrganizationModule, NoOrganizationModule } from '@blockframes/organization';
import { ProfileModule } from '@blockframes/account';
import { AccountModule } from '@blockframes/account';
import { WalletModule } from '@blockframes/ethers';
import { KeyManagerModule } from '@blockframes/ethers';
import { NotificationModule } from 'libs/notification/notification.module';

// Material
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { MovieActiveGuard } from '@blockframes/movie';

export const routes: Routes = [
  { path: '',
    redirectTo: 'movie',
    pathMatch: 'full'
  },
  {
    path: 'movie',
    loadChildren: () => import('@blockframes/movie').then(m => m.MovieModule)
  },
  {
    path: 'template',
    loadChildren: () => import('@blockframes/template').then(m => m.TemplateModule)
  },
  {
    path: ':movieId',
    canActivate: [MovieActiveGuard],
    canDeactivate: [MovieActiveGuard],
    loadChildren: () => import('@blockframes/delivery-lib').then(m => m.DeliveryModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    // Angular
    FlexLayoutModule,
    HttpClientModule,

    // Material
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatRippleModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatBadgeModule,

    // Libraries
    AuthModule,
    UploadModule,
    UiFormModule,
    OrganizationModule,
    ToolbarModule,
    MovieModule,
    AccountModule,
    ProfileModule,
    WalletModule,
    KeyManagerModule,
    NotificationModule,
    NoOrganizationModule,

    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(environment.persistenceSettings),
    AngularFireFunctionsModule,

    // Akita
    AkitaNgRouterStoreModule.forRoot(),
    environment.production ? [] : [AkitaNgDevtools.forRoot()],

    RouterModule.forChild(routes)
  ],
  providers: [],
})
export class DeliverySubModule {}
