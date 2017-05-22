import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { MarsPicture } from '../../models/MarsPicture';
import { PaginationOptions } from '../../models/Pagination';

import { MarsPicturesService } from '../../services/mars-pictures.service'

@Component({
  selector: 'mars-pictures-list',
  templateUrl: './mars-pictures-list.component.html',
  styleUrls: ['./mars-pictures-list.component.css']
})
export class MarsPicturesListComponent implements OnInit {
  
    public pageIndex: number = 0;
    public pageSize: number = 20;

    private pictureCardsLoaded: number = 0;

    constructor(public marsPicturesService: MarsPicturesService) { }

    ngOnInit() {
        this.fetch();
    }

    fetch() {
        let options = new PaginationOptions();
        options.pageIndex = this.pageIndex;
        options.pageSize = this.pageSize;

        this.marsPicturesService.getMarsPictures(options)
            .then((response) => {
                this.pageIndex = response.pagination.pageIndex;
                this.pageSize = response.pagination.pageSize;
            });
    }

    loadMore() {
        this.pageIndex++;
        this.fetch();
    }

    pictureCardLoaded(picture: MarsPicture) {
        this.pictureCardsLoaded++;
    }
}
