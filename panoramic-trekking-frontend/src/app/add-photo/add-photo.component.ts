import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEventType, HttpRequest} from '@angular/common/http';
import {Subscription} from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.css']
})
export class AddPhotoComponent implements OnInit {

  minDatePhotoWasTaken = new Date(2000, 0, 1);
  maxDatePhotoWasTaken = new Date();

  /** Name used in form which will be sent in HTTP request. */
  @Input() param = 'file';
  /** Target URL for file uploading. */
  @Input() target = 'https://file.io';
  /** File extension that accepted, same as 'accept' of <input type="file" />.
   *  By the default, it's set to 'image/*'.
   */
  @Input() accept = '*'; /* 'image/*'; */
  /** Allow you to add handler after its completion. Bubble up response text from remote. */
  @Output() complete = new EventEmitter(); // <string>();

  private files: Array<FileUploadModel> = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  onClick() {
    const fileUpload = document.getElementById('photoForUpload') as HTMLInputElement;
    fileUpload.onchange = () => {
      let idx = 0;

      const fileListAsArray = Array.from(fileUpload.files);

      for (const aFile of fileListAsArray) {
        const file = aFile;
        this.files.push({ data: file, state: 'in',
          inProgress: false, progress: 0, canRetry: false, canCancel: true });
        idx++;
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  cancelFile(file: FileUploadModel) {
    file.sub.unsubscribe();
    this.removeFileFromArray(file);
  }

  retryFile(file: FileUploadModel) {
    this.uploadFile(file);
    file.canRetry = false;
  }

  private uploadFile(file: FileUploadModel) {
    const fd = new FormData();
    fd.append(this.param, file.data);

    const req = new HttpRequest('POST', this.target, fd, {
      reportProgress: true
    });

    file.inProgress = true;
    file.sub = this.httpClient.request(req).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      tap(message => { }),
      last(),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        file.canRetry = true;
        return of(`${file.data.name} upload failed.`);
      })
    ).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          this.removeFileFromArray(file);
          this.complete.emit(event.body);
        }
      }
    );
  }

  private uploadFiles() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    // fileUpload.value = '';

    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  private removeFileFromArray(file: FileUploadModel) {
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }

}

export class FileUploadModel {
  data: File;
  state: string;
  inProgress: boolean;
  progress: number;
  canRetry: boolean;
  canCancel: boolean;
  sub?: Subscription;
}
