import * as moment from 'moment';
import { IFlight } from 'app/contracts/IFlight';

export class Flight implements IFlight {
  public name: string;
  public flightNumber: string;
  public originAirport: string;
  public destinationAirport: string;
  public departureTime: string;
  public arrivalTime: string;
  public note: string;

  public departureTimeMt: moment.Moment;
  public arrivalTimeMt: moment.Moment;

  constructor(source?: IFlight) {
    if (source) {

      this.name = source.name;
      this.flightNumber = source.flightNumber;
      this.originAirport = source.originAirport;
      this.destinationAirport = source.destinationAirport;
      this.departureTime = source.departureTime;
      this.arrivalTime = source.arrivalTime;
      this.note = source.note;

      this.departureTimeMt = moment(source.departureTime);
      this.arrivalTimeMt = moment(source.arrivalTime);
    }
  }

  public getDuration(): number {
    return this.arrivalTimeMt.diff(this.departureTimeMt);
  }
}
