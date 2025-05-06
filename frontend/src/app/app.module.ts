import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { PdfChatMainModule } from './pdf-chat-main/pdf-chat-main.module';

@NgModule({
  declarations: [AppComponent, UploadFileComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProgressBarModule,
    ToastModule,
    HttpClientModule,
    PdfChatMainModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
