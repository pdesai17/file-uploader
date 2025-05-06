import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfChatContainerComponent } from './pdf-chat-container.component';

describe('PdfChatContainerComponent', () => {
  let component: PdfChatContainerComponent;
  let fixture: ComponentFixture<PdfChatContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfChatContainerComponent]
    });
    fixture = TestBed.createComponent(PdfChatContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
