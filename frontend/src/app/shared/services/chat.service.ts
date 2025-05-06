import { Injectable } from '@angular/core';
import { baseUrl } from 'src/app/environments/env.config';
import { ASK_QUESTION } from '../constants/api-consts';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  askQuestion(params) {
    const url = baseUrl + ASK_QUESTION;
    return this.http.post(url, params);
  }
}
