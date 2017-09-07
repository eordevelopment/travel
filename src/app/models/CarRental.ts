import * as moment from 'moment';
import { ICarRental } from 'app/contracts/ICarRental';
import { Coord } from 'app/contracts/Coord';

export class CarRental implements ICarRental {
    public pickupTime: string;
    public dropOffTime: string;
    public note: string;
    public location: Coord;

    public pickupTimeMt: moment.Moment;
    public dropOffTimeMt: moment.Moment;

    constructor(source?: ICarRental) {
        if (source) {

            this.pickupTime = source.pickupTime;
            this.dropOffTime = source.dropOffTime;
            this.note = source.note;
            this.location = source.location;

            this.pickupTimeMt = moment(source.pickupTime);
            this.dropOffTimeMt = moment(source.dropOffTime);
        }
    }

    public getDuration(): number {
        return this.dropOffTimeMt.diff(this.pickupTimeMt);
    }
}
