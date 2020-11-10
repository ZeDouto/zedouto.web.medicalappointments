import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @Output() enviarReceita = new EventEmitter();

  title = "cloudsSorage";
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;

  constructor(private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `Receitas/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
              this.enviarReceita.emit(url);
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
          
        }
      });
  }
}
