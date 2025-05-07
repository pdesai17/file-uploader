import { ChatService } from './../../shared/services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss'],
})
export class ChatBotComponent implements OnInit {
  userInput = '';

  quesAnsPair = [];

  quesId = 1;

  constructor(private chatService: ChatService) {}
  ngOnInit(): void {}

  sendMessage() {
    let params = {};
    params['query'] = this.userInput;
    this.quesId = this.quesId + 1;
    this.quesAnsPair.push({
      quesId: this.quesId,
      ques: this.userInput,
      isAnsLoading: true,
    });
    this.userInput = '';

    this.chatService.askQuestion(params).subscribe({
      next: (resp: any) => {
        console.log('answer...', resp);
        let item = this.quesAnsPair.find((item) => item.quesId == this.quesId);
        item['ans'] = resp.answer;
        item['isAnsLoading'] = false;
      },
      error: (err) => console.log('error', err),
      // complete: () => (),
    });
  }
}
