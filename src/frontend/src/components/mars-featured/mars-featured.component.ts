import { Component, OnInit, Input } from '@angular/core';

import { MarsPicture } from '../../models/MarsPicture';

import { MarsPicturesService } from '../../services/mars-pictures.service';

@Component({
  selector: 'mars-featured',
  templateUrl: './mars-featured.component.html',
  styleUrls: ['./mars-featured.component.css']
})
export class MarsFeaturedComponent implements OnInit {

    constructor(public marsPicturesService: MarsPicturesService) { }

    ngOnInit() {

    }
}
