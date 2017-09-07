import { IFlight } from 'app/contracts/IFlight';
import { ICarRental } from 'app/contracts/ICarRental';
import { IHotel } from 'app/contracts/IHotel';
import { IActivity } from 'app/contracts/IActivity';

export interface ITrip {
  id: string;
  name: string;
  from: string;
  to: string;
  key: string;

  flights: IFlight[];
  carRentals: ICarRental[];
  hotels: IHotel[];
  activities: IActivity[];
}