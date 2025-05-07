import { Router } from '@angular/router';
import { UploadFileService } from './../shared/services/upload-file.service';
import { Component, OnInit } from '@angular/core';
import { baseUrl } from '../environments/env.config';
import { GET_UPLOADS } from '../shared/constants/api-consts';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  isFileUploading: Boolean = false;

  isFileReceived: Boolean = false;

  constructor(
    private uploadFileService: UploadFileService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * When files are uploaded through drag-drop
   * @param event
   */
  onDrop(event: DragEvent) {
    const file = event.dataTransfer?.files[0];
    if (file) this.uploadFile(file);
  }

  /**
   * When files are uploaded by clicking on upload card
   * @param event
   */
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) this.uploadFile(file);
  }

  uploadFile(file: File) {
    this.isFileUploading = true;

    const formData = new FormData();
    formData.append('uploadedPdf', file);

    //call upload api
    this.uploadFileService.uploadFile(formData).subscribe({
      next: async (resp: any) => {
        //storing filePath received from server
        const pdfUrl = `${baseUrl}${GET_UPLOADS}/${resp.filePath}`;
        this.uploadFileService.filePath.next(pdfUrl);
        this.isFileUploading = false;
        this.isFileReceived = true;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
