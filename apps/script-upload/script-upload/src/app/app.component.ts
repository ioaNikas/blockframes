import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'script-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private storage: AngularFireStorage) {}

  public upload(files: FileList) {
    const file = files.item(0);
    const filePath = `userName/${file.name}`;
    const task = this.storage.upload(filePath, file);
  }
}
