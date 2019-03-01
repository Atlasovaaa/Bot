import { Component, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';

import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material';


@Component({
  selector: 'app-dialog-demo',
  templateUrl: './dialog-demo.component.html',
  styleUrls: ['./dialog-demo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogDemoComponent {

@Input() ansver: string;
public user: string;
public selection: number;
public alarm: string;
public game_start: string;

render_message: string = 'Ответ сохранен';
  actionButtonLabel: string = 'Закрыть';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 3000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

constructor(public dialog: MatDialog, public snackBar: MatSnackBar) { }
  @Output('AddMessage') addMessage = new EventEmitter<object>();

  public adding(user_mes: string, bot_mes: string) {
    if (user_mes == 'раунд start') {
      this.game_start = user_mes;
    }
    if (user_mes == 'раунд finish') {
      this.game_start = user_mes;
      localStorage.setItem('раунд finish', 'Выход из игры')
    }


    if (localStorage.getItem(user_mes) == null && this.game_start !== 'раунд start') {
    
      const dialogRef = this.dialog.open(MyDialogComponent, {
        width: '600px',
        data: 'Введите ответ сами, он будет сохранен',
      });
      
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog closed: ${result}`);
        this.ansver = result;
        localStorage.setItem(user_mes, this.ansver);

    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(this.render_message, this.action ? this.actionButtonLabel : undefined, config);

      });
      bot_mes = 'Я не знаю ответа на вопрос';

    }  else if ((user_mes == 'камень' || user_mes == 'ножницы' || user_mes == 'бумага') && this.game_start == 'раунд start') {
        
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
                  if (bot_mes === 'ножницы') { this.alarm = 'Вы выиграли!';
                } else if (bot_mes === 'бумага') { this.alarm = 'Вы проиграли!'; }
      } else if (user_mes === 'бумага') {
                  if (bot_mes === 'камень') {this.alarm = 'Вы выиграли!';
                } else if (bot_mes === 'ножницы') {this.alarm = 'Вы проиграли!'; }
      } else if (user_mes === 'ножницы') {
                  if (bot_mes === 'камень') { this.alarm = 'Вы проиграли!';
                } else if (bot_mes === 'бумага') { this.alarm = 'Вы выиграли!'; }
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
   
    
    this.addMessage.emit({user_mes, bot_mes});
    this.user = '';

  }
}