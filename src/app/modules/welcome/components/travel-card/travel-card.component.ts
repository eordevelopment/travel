import { Component, OnInit, Input } from '@angular/core';
import { TravelCard } from 'app/modules/welcome/models/TravelCard';
import { ITrip } from 'app/contracts/ITrip';

@Component({
  selector: 'app-travel-card',
  templateUrl: './travel-card.component.html',
  styleUrls: ['./travel-card.component.less']
})
export class TravelCardComponent implements OnInit {
  @Input() trip: ITrip;
  public travelCard: TravelCard;

  constructor() { }

  ngOnInit() {
    this.travelCard = new TravelCard(this.trip);
  }

}
