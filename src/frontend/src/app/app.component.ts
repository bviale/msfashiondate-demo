import { Component, OnInit } from '@angular/core';

import { Observable } from "rxjs";

import { TimeService } from '../services/time.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public dateService: TimeService) {}

  ngOnInit() {
    
  }
}
