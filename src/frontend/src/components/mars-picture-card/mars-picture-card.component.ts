import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { MarsPicturesService } from '../../services/mars-pictures.service';

import { MarsPicture } from '../../models/MarsPicture';

import { MarsPictureDialogComponent } from '../mars-picture-dialog/mars-picture-dialog.component';

@Component({
  selector: 'mars-picture-card',
  templateUrl: './mars-picture-card.component.html',
  styleUrls: ['./mars-picture-card.component.css']
})
export class MarsPictureComponent {

    @Input()
    public picture: MarsPicture;

    @Output() onLoaded = new EventEmitter<MarsPicture>();

    public imageLoaded: boolean = false;

    constructor(public dialog: MdDialog, private marsPicturesService: MarsPicturesService) {}

    public pictureClicked() {
        let dialog: MdDialogRef<MarsPictureDialogComponent>;
        dialog = this.dialog.open(MarsPictureDialogComponent);
        dialog.componentInstance.picture = this.picture;
    }

    imageLoadedEvent() {
        this.imageLoaded = true;
        this.onLoaded.emit(this.picture);
    }

    favorite() {
        if (this.picture.isFavorite)
            this.marsPicturesService.removeFavorite(this.picture);
        else
            this.marsPicturesService.addFavorite(this.picture);
    }
}
