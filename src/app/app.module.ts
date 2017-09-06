import { MdlModule } from '@angular-mdl/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppRoutingModule } from './app.routing';
import { AuthGuard } from './services/auth-guard';
import { AppShellComponent } from 'app/components/app-shell/app-shell.component';
import { HomeComponent } from 'app/components/home/home.component';
import { TravelCardComponent } from 'app/components/travel-card/travel-card.component';
import { TripDashboardComponent } from 'app/components/trip-dashboard/trip-dashboard.component';

// Services
import { StorageService } from './services/storage.service';
import { FormHelperService } from './services/form-helper.service'
import { TripService } from 'app/services/trip.service';



@NgModule({
  declarations: [
    AppShellComponent,
    HomeComponent,
    TravelCardComponent,
    TripDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    JsonpModule,
    MdlModule,
  ],
  providers: [
    AuthGuard,
    StorageService,
    FormHelperService,
    TripService],
  bootstrap: [AppShellComponent]
})
export class AppModule { }