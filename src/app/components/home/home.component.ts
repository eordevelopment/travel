import { } from '@types/googlemaps';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Location, PopStateEvent } from '@angular/common';

import { StorageService } from 'app/services/storage.service';
import { IUserSession } from 'app/contracts/IUserSession';
import { ITrip } from 'app/contracts/ITrip';
import { TripService } from 'app/services/trip.service';
import { FabItem } from 'app/classes/FabItem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  @ViewChild('editUserDialog') newTripDialog: ElementRef;

  public loggedInUser: IUserSession;

  public fabItems: FabItem[];
  public trips: ITrip[];
  public items: string[];

  constructor(
    private location: Location,
    private storage: StorageService,
    private tripService: TripService) { }

  ngOnInit() {
    this.storage.setTrip();
    this.storage.loggedInUser.subscribe(value => {
      this.loggedInUser = value;
      if (value != null && value.userToken != null) {
        this.fetchTrips();

        //   const googleMap = new google.maps.Map(document.getElementById('gmap'), {
        //     center: { lat: 53.4925979, lng: -7.9133371 },
        //     zoom: 6
        // });

      } else {
        this.trips = null;
      }
    });

    this.location.subscribe((ev: PopStateEvent) => {
      (this.newTripDialog as any).close();
    });

    this.fabItems = new Array();
    this.fabItems.push(new FabItem('New trip', 'flight'));
  }

  public login(): void {
    (gapi as any).auth2.getAuthInstance().signIn();
  }

  public fabItemAction(event: FabItem): void {
    (this.newTripDialog as any).show();
  }

  private fetchTrips(): void {
    if (!this.trips) {
      this.tripService.getTrips().subscribe(values => {
        this.trips = values;
      });
    }
  }
}