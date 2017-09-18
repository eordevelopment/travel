import * as moment from 'moment';
import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { BaseComponent } from 'app/classes/BaseComponent';
import { StorageService } from 'app/services/storage.service';
import { TripService } from 'app/services/trip.service';
import { ITrip } from 'app/contracts/ITrip';
import { Trip } from 'app/models/Trip';

@Component({
  selector: 'app-trip-dashboard',
  templateUrl: './trip-dashboard.component.html',
  styleUrls: ['./trip-dashboard.component.less']
})
export class TripDashboardComponent extends BaseComponent implements OnInit {
  public trip: Trip;

  constructor(
    private route: ActivatedRoute,
    private storage: StorageService,
    private tripService: TripService,
    title: Title,
    router: Router) {
    super(router, title);
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        const id = params.get('id');
        if (id) {
          return this.tripService.getTrip(id);
        }
      })
      .subscribe((source: ITrip) => {
        this.trip = new Trip(source);
        this.storage.setTrip(this.trip);
      },
      (error: any) => this.handleError(error));
  }

  public navItinerary(): void {
    this.router.navigate(['/itinerary']);
  }

  public navMap(): void {
    this.router.navigate(['/map']);
  }
  public navIdeas(): void {
    this.router.navigate(['/ideas']);
  }

  public navPrice(): void {
    this.router.navigate(['/price']);
  }
}