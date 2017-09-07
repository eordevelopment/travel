import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/services/auth-guard';
import { TripDashboardComponent } from 'app/components/trip-dashboard/trip-dashboard.component';
import { HomeComponent } from 'app/components/home/home.component';
import { ItineraryComponent } from 'app/components/itinerary/itinerary.component';
import { ItineraryPublicComponent } from 'app/components/itinerary-public/itinerary-public.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'trip/:id',  component: TripDashboardComponent, canActivate: [AuthGuard] },
  { path: 'itinerary',  component: ItineraryPublicComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}