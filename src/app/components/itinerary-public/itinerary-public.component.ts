import * as _ from 'underscore';
import * as moment from 'moment';

import { Component, OnInit } from '@angular/core';
import { StorageService } from 'app/services/storage.service';
import { Trip } from 'app/models/Trip';
import { TripDay } from 'app/models/TripDay';

@Component({
  selector: 'app-itinerary-public',
  templateUrl: './itinerary-public.component.html',
  styleUrls: ['./itinerary-public.component.less']
})
export class ItineraryPublicComponent implements OnInit {

  public trip: Trip;
  public days: TripDay[];

  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.trip = new Trip(this.storage.getTrip());
    this.days = this.getDays(this.trip.fromMt, this.trip.toMt);

    if (this.trip.hasFlights()) {
      for (const flight of this.trip.flights) {
        const startDay = this.getDay(flight.departureTimeMt);
        const endDay = this.getDay(flight.arrivalTimeMt);
        startDay.flights.push(flight);
        if (endDay.date !== startDay.date) {
          endDay.flights.push(flight);
        }
      }
    }

    if (this.trip.hasCarRentals) {
      for (const rental of this.trip.carRentals) {
        const startDay = this.getDay(rental.pickupTimeMt);
        const endDay = this.getDay(rental.dropOffTimeMt);
        startDay.carRentals.push(rental);
        if (endDay.date !== startDay.date) {
          endDay.carRentals.push(rental);
        }
      }
    }
  }

  public getDays(startDate: moment.Moment, endDate: moment.Moment): TripDay[] {
    const dates = new Array();

    const currDate = moment(startDate).startOf('day');
    const lastDate = moment(endDate).startOf('day');

    dates.push(new TripDay(currDate.clone()));
    while (currDate.add(1, 'days').diff(lastDate) <= 0) {
      dates.push(new TripDay(currDate.clone()));
    }

    return dates;
  }

  public getDay(dateTime: moment.Moment): TripDay {
    const offset = (dateTime as any)._tzm;
    const localTime = dateTime.clone().utcOffset(offset);

    const date = localTime.format('LL');
    for (const day of this.days) {
      if (day.date === date) {
        return day;
      }
    }

    return undefined;
  }

}
