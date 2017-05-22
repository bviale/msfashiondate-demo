
import { NgModule } from '@angular/core';
import { MdButtonModule, MdCheckboxModule, MdToolbarModule, MdCardModule, MdDialogModule, MdSidenavModule, MdProgressSpinnerModule, MdIconModule, MdGridListModule } from '@angular/material';

@NgModule({
  imports: [MdButtonModule, MdCheckboxModule, MdToolbarModule, MdCardModule, MdDialogModule, MdSidenavModule, MdProgressSpinnerModule, MdIconModule, MdGridListModule],
  exports: [MdButtonModule, MdCheckboxModule, MdToolbarModule, MdCardModule, MdDialogModule, MdSidenavModule, MdProgressSpinnerModule, MdIconModule, MdGridListModule],
})
export class MaterialModule { }