import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Fire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';

// Akita
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

// Material
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

// Libraries
import { AuthModule } from '@blockframes/auth';
import { UploadModule, UiFormModule } from '@blockframes/ui';
import { WalletModule } from '@blockframes/ethers';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { AppRoutingModule } from './app-routing.module';
import { MatInputModule } from '@angular/material/input';





@NgModule({
  declarations: [AppComponent, HomeComponent, FormComponent, ListComponent, ViewComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    // Angular Fire
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    // Akita
    environment.production ? [] : [AkitaNgDevtools.forRoot()],
    // Material
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    // Librairies
    AuthModule,
    UploadModule,
    UiFormModule,
    WalletModule,
    AppRoutingModule,
  ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }], // TODO: Remove when @angular/fire is updated
  bootstrap: [AppComponent]
})
export class AppModule {}
