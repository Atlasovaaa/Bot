import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { LogServiceService } from '../log-service.service';

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css'],
  providers: [LogServiceService]
})
export class MyDialogComponent implements OnInit {

  ansver: string;
  
  constructor(public thisDialogRef: MatDialogRef<MyDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }

  open() {
    this.thisDialogRef.close(this.ansver);
  }

}

