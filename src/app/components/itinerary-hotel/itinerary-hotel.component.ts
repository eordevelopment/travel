import * as moment from 'moment';
import { } from '@types/googlemaps';

import { Component, OnInit, Input } from '@angular/core';
import { BaseItineraryItemComponent } from 'app/classes/BaseItineraryItemComponent';
import { Hotel } from 'app/models/Hotel';

@Component({
  selector: 'app-itinerary-hotel',
  templateUrl: './itinerary-hotel.component.html',
  styleUrls: ['./itinerary-hotel.component.less']
})
export class ItineraryHotelComponent extends BaseItineraryItemComponent implements OnInit {
  @Input() date: moment.Moment;
  @Input() hotel: Hotel;
  constructor() {
    super();
  }

  ngOnInit() {
    // if (this.hotel.location && this.hotel.location != null) {
    //   setTimeout(() => {
    //     const elm = document.getElementById(`gmap${this.hotel.checkinTimeMt.unix()}`);
    //     console.log(elm);
    //     const googleMap = new google.maps.Map(elm, {
    //       center: { lat: this.hotel.location.lat, lng: this.hotel.location.lon },
    //       zoom: 18,
    //       scrollwheel: false
    //     });

    //     const marker = new google.maps.Marker({
    //       map: googleMap,
    //       position: new google.maps.LatLng(this.hotel.location.lat, this.hotel.location.lon)
    //     });
    //   }, 10);

    // }
  }
}
