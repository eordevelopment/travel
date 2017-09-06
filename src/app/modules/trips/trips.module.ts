import { MdlModule } from '@angular-mdl/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TripDashboardComponent } from 'app/modules/trips/components/trip-dashboard/trip-dashboard.component';
import { TripsRoutingModule } from 'app/modules/trips/trips.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdlModule,

    ReactiveFormsModule,
    TripsRoutingModule
  ],
  declarations: [
    TripDashboardComponent,
    TripDashboardComponent
]
})
export class TripsModule { }