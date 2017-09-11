import * as moment from 'moment';

import { Component, OnInit, Input } from '@angular/core';
import { BaseItineraryItemComponent } from 'app/classes/BaseItineraryItemComponent';
import { Activity } from 'app/models/Activity';

@Component({
  selector: 'app-itinerary-activity',
  templateUrl: './itinerary-activity.component.html',
  styleUrls: ['./itinerary-activity.component.less']
})
export class ItineraryActivityComponent extends BaseItineraryItemComponent implements OnInit {
  @Input() date: moment.Moment;
  @Input() activity: Activity;
  constructor() {
    super();
  }

  ngOnInit() {
  }
}
