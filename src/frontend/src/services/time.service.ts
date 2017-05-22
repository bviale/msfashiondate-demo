import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs";

@Injectable()
export class TimeService {

    public clock: Observable<Date>;

    private REFRESH_CLOCK_INTERVAL: number = 1000;

    constructor() {
        this.clock = Observable
                    .interval(this.REFRESH_CLOCK_INTERVAL)
                    .map(d => new Date())
                    .share();
     }
}