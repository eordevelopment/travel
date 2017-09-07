import * as _ from 'underscore';
import * as moment from 'moment';

import { Component, OnInit } from '@angular/core';
import { StorageService } from 'app/services/storage.service';
import { Trip } from 'app/models/Trip';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.less']
})
export class ItineraryComponent implements OnInit {

  public trip: Trip;
  public days: moment.Moment[];

  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.trip = new Trip(this.storage.getTrip());
    console.log(this.trip);
    this.days = this.getDays(this.trip.fromMt, this.trip.toMt);
  }

  public getDays(startDate: moment.Moment, endDate: moment.Moment): moment.Moment[] {
    const dates = [];

    const currDate = moment(startDate).startOf('day');
    const lastDate = moment(endDate).startOf('day');

    dates.push(currDate.clone());
    while (currDate.add(1, 'days').diff(lastDate) <= 0) {
      dates.push(currDate.clone());
    }

    return dates;
  }

}
