import {
  Component,
  Input,
  HostListener,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadComponent {
  @Input() public accept: string[];
  @Input() private path: string;
  @Input() private types: string[];
  @Output() private uploaded = new EventEmitter<Uint8Array>();
  @Output() private storeUploaded = new EventEmitter<string>();

  public task: AngularFireUploadTask;
  public percentage: Observable<number>;
  public downloadURL: string;
  public state: 'waiting' | 'hovering' | 'uploading' | 'success' = 'waiting';


  constructor(private afStorage: AngularFireStorage, private snackBar: MatSnackBar) {}

  @HostListener('drop', ['$event'])
  onDrop($event: DragEvent) {
    $event.preventDefault();
    this.upload($event.dataTransfer.files);
  }

  @HostListener('dragover', ['$event'])
  onDragOver($event: DragEvent) {
    $event.preventDefault();
    this.state = 'hovering';
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave($event: DragEvent) {
    $event.preventDefault();
    this.state = 'waiting';
  }

  public async upload(files: FileList) {
    if (!files.item(0)) {
      this.snackBar.open('No file found', 'close', { duration: 1000 });
      this.state = 'waiting';
      return;
    }
    const file = files.item(0);

    if (this.types && !this.types.includes(file.type)) {
      this.snackBar.open('unsupported file type :( ', 'close', { duration: 1000 });
      this.state = 'waiting';
      return;
    }

    const storagePath = `${this.path}/${file.name}`;
    this.task = this.afStorage.upload(storagePath, file);

    // Progress monitoring
    this.state = 'uploading';
    this.percentage = this.task.percentageChanges();

    const snapshot = await this.task;

    // Success
    this.state = 'success';
    this.downloadURL = await snapshot.ref.getDownloadURL();
    this.storeUploaded.emit(this.downloadURL);

    const reader = new FileReader();
    reader.addEventListener('loadend', _ => {
      const buffer = new Uint8Array(reader.result as ArrayBuffer);
      this.uploaded.emit(buffer);
    });
    reader.readAsArrayBuffer(file);
  }
}
