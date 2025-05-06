import { ChatService } from './../../shared/services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss'],
})
export class ChatBotComponent implements OnInit {
  userInput = '';

  botAnswer: string[] = [
    `The candidate is familiar with a variety of tools. For web development, they use React, Angular, Node.js, and Nest.js. They have experience with RESTful APIs, database optimization, and deploying web applications. They are also proficient with cloud platforms such as AWS and Azure.`,
    `In terms of DevOps, they have a strong background in SDLC, version control using GitHub, and Azure DevOps. They also have hands-on experience with Docker, Kubernetes, and performance monitoring tools like Datadog.`,
    `For programming, they are skilled in JavaScript, Python, TypeScript, and C#. They use frameworks and libraries like Express.js, Flask, Django, and Node.js. They are familiar with MongoDB, MSSQL, and NoSQL databases. Other tools they use include Postman for API testing and development.`,
  ];
  pageLabel = 'Page 1';

  quesAnsPair = [];

  answerLoading: boolean = false;

  quesId = 1;
  constructor(private chatService: ChatService) {}
  ngOnInit(): void {
    // let ques = 'What tools is the candidate familiar with?';
    // this.quesAnsPair.push({
    //   ques: ques,
    //   ans: this.botAnswer,
    // });
  }

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
