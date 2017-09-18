import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FabMenuComponent } from 'app/modules/controls/fab-menu/fab-menu.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FabMenuComponent
  ],
  exports: [FabMenuComponent],
  providers: [
    Title
  ]
})
export class ControlsModule { }
