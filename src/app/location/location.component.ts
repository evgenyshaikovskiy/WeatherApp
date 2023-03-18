import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GeolocationService } from '../services/geolocation.service';
import { WeatherService } from '../services/weather.service';

// component searches for location in certain way and returns longitude and latitude to parent component
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent {
  public cityFormControl = new FormControl('', [Validators.required]);

  public longitude!: number;
  public latitude!: number;

  public isUserAllowedLocationAccess: boolean = false;
  public isChoiceMade: boolean = false;

  constructor(private readonly geolocationService: GeolocationService) {
    geolocationService.getPosition().subscribe({
      next: pos =>
        ([
          this.longitude,
          this.latitude,
          this.isUserAllowedLocationAccess,
          this.isChoiceMade,
        ] = [pos.coords.longitude, pos.coords.latitude, true, true]),
      error: e => {
        if (e.message === 'User denied geolocation prompt') {
          this.isUserAllowedLocationAccess = false;
          this.isChoiceMade = true;
        }
      },
    });
  }

  public onBtnClick() {
    if (this.cityFormControl.valid) {
      this.geolocationService
        .getPositionByName(this.cityFormControl.value as string)
        .subscribe({
          next: cityArray =>
            ([this.longitude, this.latitude] = [
              cityArray.at(0).longitude,
              cityArray.at(0).latitude,
            ]),
          error: e => console.log(e),
        });
    }
  }
}
