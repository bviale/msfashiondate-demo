import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common'

import { MarsPictureComponent } from './mars-picture-card/mars-picture-card.component';
import { MarsPicturesListComponent } from './mars-pictures-list/mars-pictures-list.component'
import { TemperatureComponent } from './temperature/temperature.component';
import { MarsFeaturedComponent } from './mars-featured/mars-featured.component';

import { MaterialModule } from '../app/material.module'
import { ChartsModule } from 'ng2-charts';
import { PipesModule } from '../pipes/pipes.module'

const components = [MarsPictureComponent, MarsPicturesListComponent, TemperatureComponent, MarsFeaturedComponent];

@NgModule({
    imports: [CommonModule, MaterialModule, ChartsModule, PipesModule],
    declarations: [components],
    exports: [components]
})
export class ComponentsModule { }