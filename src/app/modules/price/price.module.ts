import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { PriceHomeComponent } from 'app/modules/price/price-home/price-home.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PriceHomeComponent
],
  providers: [
    Title
  ]
})
export class PriceModule { }
