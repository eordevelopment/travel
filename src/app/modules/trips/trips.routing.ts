import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripDashboardComponent } from 'app/modules/trips/components/trip-dashboard/trip-dashboard.component';
import { AuthGuard } from 'app/services/auth-guard';

const routes: Routes = [
    { path: 'trip/:id',  component: TripDashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class TripsRoutingModule {}