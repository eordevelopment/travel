import { Coord } from 'app/contracts/Coord';
import { Link } from 'app/contracts/Link';

export interface IActivity {
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    Location: Coord;
    note: string;
    links: Link[];
}
