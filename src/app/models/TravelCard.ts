import * as moment from 'moment';
import { ITrip } from 'app/contracts/ITrip';

export class TravelCard implements ITrip {
  public id: string;
  public name: string;
  public from: string;
  public to: string;

  public fromMt: moment.Moment;
  public toMt: moment.Moment;

  constructor(source?: ITrip) {
    if (source) {
      this.id = source.id;
      this.name = source.name;
      this.from = source.from;
      this.to = source.to;
      this.fromMt = moment(source.from);
      this.toMt = moment(source.to);
    }
  }
}
