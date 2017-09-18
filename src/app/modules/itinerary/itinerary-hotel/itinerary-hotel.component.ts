import * as moment from 'moment';
declare var Marker;
declare var SQUARE_PIN;
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
    if (this.hotel.location && this.hotel.location != null) {
      setTimeout(() => {
        this.renderMap();
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': "JNB, airport" }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
              console.log(results);
          } else {
            console.log(results);
          }
      });

      }, 10);

    }
  }

  private renderMap(): void {
    const elm = document.getElementById(`gmap${this.hotel.checkinTimeMt.unix()}`);
    const googleMap = new google.maps.Map(elm, {
      center: { lat: this.hotel.location.lat, lng: this.hotel.location.lon },
      zoom: 18,
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    const infowindow = new google.maps.InfoWindow({
      content: this.hotel.name
    });

    const marker = new Marker({
      map: googleMap,
      position: new google.maps.LatLng(this.hotel.location.lat, this.hotel.location.lon),
      icon: {
        path: SQUARE_PIN,
        fillColor: 'rgb(0,150,136)',
        fillOpacity: 1,
        strokeColor: '',
        strokeWeight: 0
      },
      map_icon_label: '<span class="map-icon map-icon-lodging"></span>'
    });

    marker.addListener('click', function() {
      infowindow.open(googleMap, marker);
    });
  }
}
