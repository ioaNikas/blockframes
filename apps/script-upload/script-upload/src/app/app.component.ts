import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthQuery } from '@blockframes/auth';

@Component({
  selector: 'script-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private storage: AngularFireStorage, private auth: AuthQuery) {}

  public upload(files: FileList) {
    const file = files.item(0);
    const filePath = `${this.auth.user.uid}/${file.name}`;
    const task = this.storage.upload(filePath, file);
  }
}
