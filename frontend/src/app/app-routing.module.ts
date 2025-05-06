import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadFileComponent } from './upload-file/upload-file.component';

const routes: Routes = [
  {
    path: '',
    component: UploadFileComponent,
  },
  // {
  //   path: 'notebook',
  //   loadChildren: () =>
  //     import('./pdf-chat-main/pdf-chat-main.module').then(
  //       (m) => m.PdfChatMainModule
  //     ),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
