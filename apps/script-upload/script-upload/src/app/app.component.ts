import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthQuery } from '@blockframes/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'script-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(
    private storage: AngularFireStorage,
    private auth: AuthQuery,
    private snackBar: MatSnackBar
  ) {}

  public upload(files: FileList) {
    if (!this.auth.user) {
      this.snackBar.open('Please login before', 'Ok', { duration: 1500 });
      return;
    }
    const file = files.item(0);
    const filePath = `${this.auth.user.uid}/${file.name}`;
    const task = this.storage.upload(filePath, file);
  }
}
