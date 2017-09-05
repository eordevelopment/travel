import { MdlModule } from '@angular-mdl/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WelcomeRoutingModule } from 'app/modules/welcome/welcome.routing';
import { HomeComponent } from 'app/modules/welcome/components/home/home.component';
import { TravelCardComponent } from 'app/modules/welcome/components/travel-card/travel-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdlModule,

    ReactiveFormsModule,
    WelcomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    TravelCardComponent
]
})
export class WelcomeModule { }
