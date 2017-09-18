import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { IdeasHomeComponent } from 'app/modules/ideas/ideas-home/ideas-home.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    IdeasHomeComponent
],
  providers: [
    Title
  ]
})
export class IdeasModule { }
