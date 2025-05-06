import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { baseUrl } from 'src/app/environments/env.config';
import { UPLOAD_PDF } from '../constants/api-consts';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  filePath: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  uploadFile(params) {
    const url = baseUrl + UPLOAD_PDF;
    return this.http.post(url, params);
  }
}
