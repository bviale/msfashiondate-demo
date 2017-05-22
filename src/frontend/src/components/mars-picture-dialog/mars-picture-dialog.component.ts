import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { MarsPicture } from '../../models/MarsPicture';

@Component({
  selector: 'mars-picture-dialog',
  templateUrl: './mars-picture-dialog.component.html'
})
export class MarsPictureDialogComponent implements OnInit {

    public picture: MarsPicture;

    ngOnInit() {
        
    }
}
