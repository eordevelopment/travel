import { Coord } from 'app/contracts/Coord';
import { Link } from 'app/contracts/Link';

export interface IHotel {
    name: string;
    description: string;
    checkinTime: string;
    Location: Coord;
    note: string;
    links: Link[];
    numNights: number;
    address: string;
}
