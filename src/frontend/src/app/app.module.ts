import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';

// Submodules
import { ComponentsModule } from '../components/components';

// Services
import { MarsPicturesService } from '../services/mars-pictures.service';
import { TemperatureService } from '../services/temperature.service';
import { TimeService } from '../services/time.service';

// AOT-force components
import { MarsPictureDialogComponent } from '../components/mars-picture-dialog/mars-picture-dialog.component';

// Other dependencies
import { MaterialModule } from './material.module';
import { ChartsModule } from 'ng2-charts';
import { PipesModule } from '../pipes/pipes.module'

@NgModule({
  declarations: [
    AppComponent,
    MarsPictureDialogComponent
  ],
  entryComponents: [
    MarsPictureDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    ComponentsModule,
    ChartsModule,
    PipesModule
  ],
  providers: [
    MarsPicturesService,
    TemperatureService,
    TimeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
