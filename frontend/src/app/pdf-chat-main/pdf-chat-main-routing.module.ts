import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfChatContainerComponent } from './pdf-chat-container/pdf-chat-container.component';

const routes: Routes = [
  {
    path: '',
    component: PdfChatContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PdfChatMainRoutingModule {}
