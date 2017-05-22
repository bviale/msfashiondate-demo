import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

import { Temperature } from '../../models/Temperature';

import { TemperatureService } from '../../services/temperature.service';

@Component({
  selector: 'temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {
    @ViewChild(BaseChartDirective) chart: BaseChartDirective;

    public dataLoaded: boolean = false;

    // Chart config
    public chartOptions: any = {
        responsive: true
    };

    public chartType: string = 'line';
    public chartLegend: boolean = true;
    public chartColors: Array<any> = [
        { // grey
            //backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            //backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        }
    ];

    public chartData: Array<any> = [
        {data: [], label: 'Captor 1'},
        {data: [], label: 'Captor 2'}
    ];

    public chartLabels: Array<string> = [];

    private nbPoints: number = 40;

    constructor(private temperatureService: TemperatureService) { }

    ngOnInit() {
        for (var i = 0; i < this.nbPoints;  i++)
            this.chartLabels.push('');
        
        // Merge colors to dataset
        for (var j in this.chartData)
            Object.assign(this.chartData[j], this.chartColors[j]);

        this.fetch();
    }

    fetch() {
       this.temperatureService.watchTemperatures(2000, this.nbPoints).subscribe((temperature) => {
            this.dataLoaded = true;

            if (temperature.captorId == 'captor1') {
                this.chartData[0].data.push(temperature.celsiusValue);
                if (this.chartData[0].data.length > this.nbPoints)
                    this.chartData[0].data.splice(0, 1);
            }
            else if (temperature.captorId == 'captor2') {
                this.chartData[1].data.push(temperature.celsiusValue);
                if (this.chartData[1].data.length > this.nbPoints)
                    this.chartData[1].data.splice(0, 1);
            }

            if (this.chart && this.chart.chart) {
                this.chart.chart.config.data.labels = this.chartLabels;
                this.chart.chart.config.data.datasets = this.chartData;
                this.chart.chart.update();   
            }

       });
    }
}
