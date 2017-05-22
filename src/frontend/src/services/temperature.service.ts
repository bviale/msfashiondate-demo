import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable, Observer } from "rxjs";

import { Temperature } from '../models/Temperature';

@Injectable()
export class TemperatureService {

    constructor(private http: Http) { }

    public getTemperatures(nbHistory: number): Promise<Array<Temperature>> {
        let url = '/api/temperature';
        let params = new URLSearchParams();
        if (nbHistory)
            params.set('nbHistory', nbHistory.toString());

        return this.http.get(url, {search: params}).toPromise()
            .then((result) => {
                return <Array<Temperature>> result.json();
            });
    }

    public watchTemperatures(timespan: number, initialHistory: number): Observable<Temperature> {
        let nbHistory = initialHistory;
        return Observable.create((observer) => {

            var chainCallback = () => {
                this.getTemperatures(nbHistory).then((temperatures) => {
                    for (var i in temperatures)
                        observer.next(temperatures[i]);

                    nbHistory = null;
                    setTimeout(chainCallback, timespan);
                });
            }

            chainCallback();
        });
    }
}