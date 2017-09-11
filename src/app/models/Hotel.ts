import * as moment from 'moment';
import { Coord } from 'app/contracts/Coord';
import { IHotel } from 'app/contracts/IHotel';
import { Link } from 'app/contracts/Link';

export class Hotel implements IHotel {
    public name: string;
    public description: string;
    public checkinTime: string;
    public location: Coord;
    public note: string;
    public links: Link[];
    public numNights: number;
    public address: string;

    public checkinTimeMt: moment.Moment;

    constructor(source?: IHotel) {
        if (source) {

            this.name = source.name;
            this.description = source.description;
            this.checkinTime = source.checkinTime;
            this.location = source.location;
            this.note = source.note;
            this.links = source.links;
            this.numNights = source.numNights;
            this.address = source.address;

            this.checkinTimeMt = moment(source.checkinTime);
        }
    }
}
