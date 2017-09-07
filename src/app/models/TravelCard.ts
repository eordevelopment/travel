import * as moment from 'moment';
import { ITrip } from 'app/contracts/ITrip';
import { IFlight } from 'app/contracts/IFlight';
import { ICarRental } from 'app/contracts/ICarRental';
import { IHotel } from 'app/contracts/IHotel';
import { IActivity } from 'app/contracts/IActivity';

export class TravelCard implements ITrip {
  public id: string;
  public name: string;
  public from: string;
  public to: string;
  public key: string;
  public flights: IFlight[];
  public carRentals: ICarRental[];
  public hotels: IHotel[];
  public activities: IActivity[];

  public fromMt: moment.Moment;
  public toMt: moment.Moment;

  constructor(source?: ITrip) {
    if (source) {
      this.id = source.id;
      this.name = source.name;
      this.from = source.from;
      this.to = source.to;
      this.key = source.key;
      this.fromMt = moment(source.from);
      this.toMt = moment(source.to);
    }
  }
}
