import * as _ from 'underscore';
import * as moment from 'moment';

import { Component, OnInit } from '@angular/core';
import { StorageService } from 'app/services/storage.service';
import { Trip } from 'app/models/Trip';
import { Itinerary } from 'app/models/Itinerary';

@Component({
  selector: 'app-itinerary-public',
  templateUrl: './itinerary-public.component.html',
  styleUrls: ['./itinerary-public.component.less']
})
export class ItineraryPublicComponent implements OnInit {

  public trip: Trip;
  public itinerary: Itinerary;

  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.trip = new Trip(this.storage.getTrip());
    this.itinerary = new Itinerary(this.trip);
  }
}
