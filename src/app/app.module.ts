import { MdlModule } from '@angular-mdl/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppRoutingModule } from './app.routing';
import { AppShellComponent } from 'app/app-shell/app-shell.component';

// Services
import { StorageService } from './services/storage.service';

// Feature modules
import { WelcomeModule } from 'app/modules/welcome/welcome.module';
import { TripService } from 'app/services/trip.service';

@NgModule({
  declarations: [
    AppShellComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    JsonpModule,
    MdlModule,

    WelcomeModule
  ],
  providers: [StorageService, TripService],
  bootstrap: [AppShellComponent]
})
export class AppModule { }
