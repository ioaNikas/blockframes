// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

// Akita
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';

// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing-module';
import { LayoutComponent } from './layout/layout.component';
import { DeliveryQuery} from '@blockframes/material'; // TODO: find better way to load material lib
import { TemplateModule} from '@blockframes/material'; // TODO: find better way to load material lib

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


@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
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
    environment.production ? [] : [AkitaNgDevtools.forRoot()]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
