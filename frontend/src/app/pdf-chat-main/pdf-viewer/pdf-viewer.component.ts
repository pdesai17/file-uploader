import { UploadFileService } from './../../shared/services/upload-file.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
})
export class PdfViewerComponent implements OnInit {
  pdfSrc: string = null;
  constructor(private uploadFileService: UploadFileService) {}

  ngOnInit(): void {
    this.uploadFileService.filePath.subscribe((resp) => {
      if (resp) {
        this.pdfSrc = resp;
      } else {
        //call /getUploads api
      }
    });
  }
}
