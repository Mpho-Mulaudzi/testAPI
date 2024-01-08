import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  data: any;

  constructor(private http: HttpClient) {}

  getPairInfo(): void {
    const apiUrl = 'https://www.alphavantage.co/query';
    const params = {
      function: 'UNEMPLOYMENT',
      // symbol: 'GBPUSD',
      // interval: 'weekly',
      // time_period: '10',
      // series_type: 'open',
      apikey: 'YLQ2AMKLMVGP3EZ2Q',
    };
    this.http.get(apiUrl, { params }).subscribe((response) => {
      this.data = response;
      console.log(this.data);
    });
  }
}
