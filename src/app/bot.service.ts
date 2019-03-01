import { Messages } from './bot';

export class BotService {
 
   private data: Messages[] = [];

  getData(): Messages[] {
    return this.data;
  }

 addData(event: any) {
    const { user_mes, bot_mes } = event;
    if (user_mes == null) {
      return;
    }
 
  this.data.push(new Messages(user_mes, bot_mes));
}


}