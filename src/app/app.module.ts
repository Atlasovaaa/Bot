import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialAppModule } from './ngmaterial.module';

import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { DialogDemoComponent } from './dialog-demo/dialog-demo.component';
import { TwoComponent } from './two/two.component';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { LogServiceService } from './log-service.service';

@NgModule({
  imports:      [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MaterialAppModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  exports: [],
  declarations: [
    AppComponent,
    DialogDemoComponent,
    MyDialogComponent,
    TwoComponent
    ],
     entryComponents: [
    MyDialogComponent
    ],
    providers: [ LogServiceService ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
   bootstrap: [ AppComponent ]
})
export class AppModule { }
