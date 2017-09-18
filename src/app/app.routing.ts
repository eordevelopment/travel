import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/services/auth-guard';
import { TripDashboardComponent } from 'app/components/trip-dashboard/trip-dashboard.component';
import { HomeComponent } from 'app/components/home/home.component';
import { ItineraryHomeComponent } from 'app/modules/itinerary/itinerary-home/itinerary-home.component';
import { MapHomeComponent } from 'app/modules/map/map-home/map-home.component';
import { IdeasHomeComponent } from 'app/modules/ideas/ideas-home/ideas-home.component';
import { PriceHomeComponent } from 'app/modules/price/price-home/price-home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'trip/:id',  component: TripDashboardComponent, canActivate: [AuthGuard] },
  { path: 'itinerary',  component: ItineraryHomeComponent, canActivate: [AuthGuard] },
  { path: 'map',  component: MapHomeComponent, canActivate: [AuthGuard] },
  { path: 'ideas',  component: IdeasHomeComponent, canActivate: [AuthGuard] },
  { path: 'price',  component: PriceHomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}