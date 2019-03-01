import { Component, Input } from '@angular/core';


@Component({
  selector: 'two',
  templateUrl: './two.component.html',
  styles: [ '' ]
})
export class TwoComponent  {
  @Input() message: string[];
  
}
