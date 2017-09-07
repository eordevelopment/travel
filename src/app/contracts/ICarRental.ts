import { Coord } from 'app/contracts/Coord';

export interface ICarRental {
    pickupTime: string;
    dropOffTime: string;
    note: string;
    location: Coord;
}