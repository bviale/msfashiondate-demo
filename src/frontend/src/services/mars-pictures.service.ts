import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable, BehaviorSubject } from "rxjs";

import { MarsPicturesApiResponse, MarsPicture } from '../models/MarsPicture';
import { PaginationOptions } from '../models/Pagination';

@Injectable()
export class MarsPicturesService {

    public pictures: BehaviorSubject<Array<MarsPicture>>;
    public favoritesPictures: Observable<Array<MarsPicture>>;

    constructor(private http: Http) { 
        this.pictures = new BehaviorSubject([]);
        this.favoritesPictures = this.pictures.map((a) => a.filter((p) => p.isFavorite));
    }

    public getMarsPictures(paginationOptions: PaginationOptions): Promise<MarsPicturesApiResponse> {
        let url = '/api/mars';
        let params = new URLSearchParams();
        params.set('PageIndex', paginationOptions.pageIndex.toString());
        params.set('PageSize', paginationOptions.pageSize.toString());

        return this.http.get(url, { search: params }).toPromise()
            .then((result) => {
                let response: MarsPicturesApiResponse = result.json();
                this.pictures.next(this.pictures.getValue().concat(response.pictures));
                return response;
            });
    }
    
    public addFavorite(picture: MarsPicture) {
        picture.isFavorite = true;
        this.pictures.next(this.pictures.getValue());
    }

    public removeFavorite(picture: MarsPicture) {
        picture.isFavorite = false;
        this.pictures.next(this.pictures.getValue());
    }
}