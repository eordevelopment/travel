import * as _ from 'underscore';
import * as moment from 'moment';

import { Component, OnInit } from '@angular/core';
import { StorageService } from 'app/services/storage.service';
import { Trip } from 'app/models/Trip';
import { Itinerary } from 'app/models/Itinerary';
import { FabItem } from 'app/classes/FabItem';

@Component({
  selector: 'app-itinerary-home',
  templateUrl: './itinerary-home.component.html',
  styleUrls: ['./itinerary-home.component.less']
})
export class ItineraryHomeComponent implements OnInit {

  public trip: Trip;
  public itinerary: Itinerary;
  public fabItems: FabItem[];

  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.trip = new Trip(this.storage.getTrip());
    this.itinerary = new Itinerary(this.trip);

    this.fabItems = new Array();
    this.fabItems.push(new FabItem('Add flight', 'flight'));
    this.fabItems.push(new FabItem('Add hotel', 'hotel'));
    this.fabItems.push(new FabItem('Add car rental', 'directions_car'));
    this.fabItems.push(new FabItem('Add activity', 'directions_walk'));
    this.fabItems.push(new FabItem('Add note', 'edit'));
  }

  public fabItemAction(event: FabItem): void {
  }
}
