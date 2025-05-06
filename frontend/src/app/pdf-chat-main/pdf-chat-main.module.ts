import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PdfChatContainerComponent } from './pdf-chat-container/pdf-chat-container.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { PdfChatMainRoutingModule } from './pdf-chat-main-routing.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    PdfChatContainerComponent,
    ChatBotComponent,
    PdfViewerComponent,
  ],
  imports: [
    CommonModule,
    PdfChatMainRoutingModule,
    PdfViewerModule,
    FormsModule,
  ],
  exports: [PdfChatContainerComponent],
})
export class PdfChatMainModule {}
