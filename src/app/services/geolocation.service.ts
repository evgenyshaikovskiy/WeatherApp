import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor(private readonly http: HttpClient) {}

  public getPosition(): Observable<any> {
    return new Observable(observer => {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          observer.next(position);
          observer.complete();
        },
        error => observer.error(error)
      );
    });
  }

  public getPositionByName(cityName: string): Observable<any> {
    return this.http.get(
      `https://api.api-ninjas.com/v1/geocoding?city=${cityName}`,
      {
        headers: {
          'X-Api-Key': 'vgHPjCHkCUpzsSUow/ql9A==XhldppMUxHsxsqJw',
        },
      }
    );
  }
}
