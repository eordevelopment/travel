import * as moment from 'moment';

import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'app/models/Flight';
import { BaseItineraryItemComponent } from 'app/classes/BaseItineraryItemComponent';

@Component({
  selector: 'app-itinerary-flight',
  templateUrl: './itinerary-flight.component.html',
  styleUrls: ['./itinerary-flight.component.less']
})
export class ItineraryFlightComponent extends BaseItineraryItemComponent implements OnInit {
  @Input() date: moment.Moment;
  @Input() flight: Flight;
  constructor() {
    super();
   }

  ngOnInit() {
  }

  public isDepartureDay(): boolean {
    return this.isSameDay(this.date, this.flight.departureTimeMt);
  }

  public isArrivalDay(): boolean {
    return this.isSameDay(this.date, this.flight.arrivalTimeMt);
  }

}
