import { Component, OnInit } from '@angular/core';
import { BotService } from './bot.service';
import { Messages } from './bot';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BotService]
})
export class AppComponent implements OnInit {

  message: Messages[] = [];

  constructor(private botService: BotService) {

  }

  addMessage(user: string, bot: string) {

    this.botService.addData(user);

  }
  ngOnInit() {

    this.message = this.botService.getData();

  }

}