import { NgModule } from '@angular/core';

import { SolDatePipe } from './sol-date.pipe';

const pipes = [SolDatePipe];

@NgModule({
    declarations: [pipes],
    exports: [pipes]
})
export class PipesModule { }