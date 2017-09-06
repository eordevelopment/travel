import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ITrip } from 'app/contracts/ITrip';
import { BaseComponent } from 'app/classes/BaseComponent';
import { TravelCard } from 'app/models/TravelCard';

@Component({
  selector: 'app-travel-card',
  templateUrl: './travel-card.component.html',
  styleUrls: ['./travel-card.component.less']
})
export class TravelCardComponent extends BaseComponent implements OnInit {
  @Input() trip: ITrip;
  public travelCard: TravelCard;

  constructor(title: Title, router: Router) {
    super(router, title);
   }

  ngOnInit() {
    this.travelCard = new TravelCard(this.trip);
  }

  public viewTrip(): void {
    this.router.navigate(['/trip', this.trip.id]);
  }

}