import * as moment from 'moment';

import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'app/models/Flight';

@Component({
  selector: 'app-itinerary-flight',
  templateUrl: './itinerary-flight.component.html',
  styleUrls: ['./itinerary-flight.component.less']
})
export class ItineraryFlightComponent implements OnInit {
  @Input() date: moment.Moment;
  @Input() flight: Flight;
  constructor() { }

  ngOnInit() {
  }

  public isDepartureDay(): boolean {
    const flightDate = this.flight.departureTimeMt.format('LL');
    const date = this.date.format('LL');
    return flightDate === date;
  }

  public isArrivalDay(): boolean {
    const flightDate = this.flight.arrivalTimeMt.format('LL');
    const date = this.date.format('LL');
    return flightDate === date;
  }

}
