import { Component, ViewChild } from '@angular/core';
import { ApiserviceService } from './apiservice.service';

import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  title = 'test-apis';
  data: any = {
    ticker: '',
    queryCount: 0,
    resultsCount: 0,
    adjusted: true,
    results: [
      // Array elements...
    ],
    status: '',
  };
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['c', 'o', 'h', 'l'];

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    // this.getPairInfo();
    this.getpriceDataPoints();
  }

  // getPairInfo(): void {
  //   const apiUrl = 'https://www.alphavantage.co/query';
  //   const params = {
  //     function: 'NONFARM_PAYROLL',
  //     // symbol: 'GBPUSD',
  //     // interval: 'weekly',
  //     // time_period: '10',
  //     // series_type: 'open',
  //     apikey: 'YLQ2AMKLMVGP3EZ2Q',
  //   };
  //   this.http.get(apiUrl, { params }).subscribe((response) => {
  //     this.data = response;
  //     console.log(this.data);
  //   });
  // }

  getpriceDataPoints(): void {
    const apiUrl =
      'https://api.polygon.io/v2/aggs/ticker/C:GBPUSD/range/1/day/2010-01-04/2025-01-07?adjusted=true&sort=desc&limit=5000&apiKey=ZlmKy0XUAh2fZFca095OpfhtqcQtp2NX';

    this.http.get(apiUrl).subscribe((response: any) => {
      this.data.ticker = response.ticker;
      this.data.resultsCount = response.resultsCount;
      this.data.status = response.status;
      this.data.results = response.results.map((price: any) => {
        return {
          c: price.c,
          o: price.o,
          h: price.h,
          l: price.l,
        };
      });
      this.dataSource = new MatTableDataSource<any>(this.data.results);
      this.dataSource.paginator = this.paginator;
      console.log(this.data.ticker);
      console.log(this.data.results); // For testing purposes only
    });
  }
}
