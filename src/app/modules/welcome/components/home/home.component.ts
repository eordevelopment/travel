
import { Component, OnInit } from '@angular/core';

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
      } else {
        this.trips = null;
      }
    });
  }

}
