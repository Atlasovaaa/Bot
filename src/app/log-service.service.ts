import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class LogServiceService {
 // game_start: string;
  public selection: number;
public alarm: string;
public game_start: string;
public user_mes: string;
public bot_mes: string;
public ansver: string;

essage: string = 'Ответ сохранен';
  actionButtonLabel: string = 'Закрыть';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 3000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  constructor(public dialog: MatDialog, public snackBar: MatSnackBar) { }

  consoleText(user_mes, bot_mes) {
    //console.log(arg);
    if (user_mes == 'раунд start') {
      this.game_start = user_mes;
    }
    if (user_mes == 'раунд finish') {
      this.game_start = user_mes;
      localStorage.setItem('раунд finish', 'Выход из игры');
    }
  
    if ((user_mes == 'камень' || user_mes == 'ножницы' || user_mes == 'бумага') && this.game_start == 'раунд start') {
      
    this.selection = Math.random();

      if (this.selection < 0.34) {
        bot_mes = 'камень';
      } else if (this.selection <= 0.67) {
        bot_mes = 'бумага';
      } else {
        bot_mes = 'ножницы';
      }

      if (user_mes === bot_mes) { this.alarm = 'Ничья!';
    } else if (user_mes === 'камень') {
                if (bot_mes === 'ножницы') { this.alarm = 'Ты выиграл!';
              } else if (bot_mes === 'бумага') { this.alarm = 'Ты проиграл!'; }
    } else if (user_mes === 'бумага') {
                if (bot_mes === 'камень') {this.alarm = 'Ты выиграл!';
              } else if (bot_mes === 'ножницы') {this.alarm = 'Ты проиграл!'; }
    } else if (user_mes === 'ножницы') {
                if (bot_mes === 'камень') { this.alarm = 'Ты проиграл!';
              } else if (bot_mes === 'бумага') { this.alarm = 'Ты выиграл!'; }
    }

    let res = new MatSnackBarConfig();
    res.verticalPosition = this.verticalPosition;
    res.horizontalPosition = this.horizontalPosition;
    res.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(this.alarm, this.action ? this.actionButtonLabel : undefined, res);

  } else if (this.game_start == 'раунд start' && (user_mes !== 'камень' && user_mes !== 'ножницы' && user_mes !== 'бумага')) {
          bot_mes = 'Необходимо выбрать камень, ножницы или бумагу';
  } else if (user_mes == 'help') {
      bot_mes = 'Введите команду "раунд start" для запуска игры "Камень, ножницы, бумага", введите "раунд finish" для выхода из игры';
  } else {
    bot_mes = localStorage.getItem(user_mes);
  }
}
  //constructor() { }
}
