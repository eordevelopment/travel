import * as moment from 'moment';

import { Component, OnInit, Input } from '@angular/core';
import { CarRental } from 'app/models/CarRental';
import { BaseItineraryItemComponent } from 'app/classes/BaseItineraryItemComponent';

@Component({
  selector: 'app-itinerary-rental',
  templateUrl: './itinerary-rental.component.html',
  styleUrls: ['./itinerary-rental.component.less']
})
export class ItineraryRentalComponent extends BaseItineraryItemComponent implements OnInit {
  @Input() date: moment.Moment;
  @Input() rental: CarRental;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  public isPickupDay(): boolean {
    return this.isSameDay(this.date, this.rental.pickupTimeMt);
  }

  public isDropoffDay(): boolean {
    return this.isSameDay(this.date, this.rental.dropOffTimeMt);
  }

}
