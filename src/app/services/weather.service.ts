import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private readonly http: HttpClient) {}

  public getWeatherForecast() {
    return this.http.get(
      'https://api.open-meteo.com/v1/forecast?latitude=53.89&longitude=27.57&hourly=temperature_2m'
    );
  }
}
