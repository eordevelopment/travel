import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { ItineraryFlightComponent } from 'app/modules/itinerary/itinerary-flight/itinerary-flight.component';
import { ItineraryRentalComponent } from 'app/modules/itinerary/itinerary-rental/itinerary-rental.component';
import { ItineraryHotelComponent } from 'app/modules/itinerary/itinerary-hotel/itinerary-hotel.component';
import { ItineraryActivityComponent } from 'app/modules/itinerary/itinerary-activity/itinerary-activity.component';
import { ItineraryHomeComponent } from './itinerary-home/itinerary-home.component';
import { ControlsModule } from 'app/modules/controls/controls.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ControlsModule
  ],
  declarations: [
    ItineraryFlightComponent,
    ItineraryRentalComponent,
    ItineraryHotelComponent,
    ItineraryActivityComponent,
    ItineraryHomeComponent,
    ItineraryHomeComponent
],
  providers: [
    Title
  ]
})
export class ItineraryModule { }
