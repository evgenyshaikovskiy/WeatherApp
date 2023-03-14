import { GeolocationService } from './services/geolocation.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public longitude?: number;
  public latitude?: number;

  constructor(private readonly geolocationService: GeolocationService) {
    geolocationService.getPosition().subscribe({
      next: pos =>
        ([this.longitude, this.latitude] = [
          pos.coords.longitude,
          pos.coords.latitude,
        ]),
      error: e => console.log(e),
    });
  }
}
