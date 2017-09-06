
import { Component, OnInit } from '@angular/core';
import {} from '@types/googlemaps';

import { TravelCard } from 'app/modules/welcome/models/TravelCard';
import { StorageService } from 'app/services/storage.service';
import { IUserSession } from 'app/contracts/IUserSession';
import { ITrip } from 'app/contracts/ITrip';
import { TripService } from 'app/services/trip.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  public loggedInUser: IUserSession;
  public trips: ITrip[];
  public items: string[];

  constructor(private storage: StorageService, private tripService: TripService) { }

  ngOnInit() {
    this.storage.loggedInUser.subscribe(value => {
      this.loggedInUser = value;
      if (value != null) {
        this.tripService.getTrips().subscribe(values => {
          this.trips = values;
        });

      //   const googleMap = new google.maps.Map(document.getElementById('gmap'), {
      //     center: { lat: 53.4925979, lng: -7.9133371 },
      //     zoom: 6
      // });

      } else {
        this.trips = null;
      }
    });
  }

  public login(): void {
    (gapi as any).auth2.getAuthInstance().signIn();
  }
}