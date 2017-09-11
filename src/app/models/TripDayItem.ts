import * as moment from 'moment';
import { Flight } from 'app/models/Flight';
import { CarRental } from 'app/models/CarRental';
import { Activity } from 'app/models/Activity';
import { Hotel } from 'app/models/Hotel';

export class TripDayItem {
    public dateMt: moment.Moment;
    public item: any;

    constructor(dateMt: moment.Moment, item: any) {
        this.dateMt = dateMt;
        this.item = item;
    }

    public isFlight(): boolean {
        return (<Flight>this.item).departureTimeMt !== undefined;
    }

    public isRental(): boolean {
        return (<CarRental>this.item).pickupTimeMt !== undefined;
    }

    public isActivity(): boolean {
        return (<Activity>this.item).startTimeMt !== undefined;
    }

    public isHotel(): boolean {
        return (<Hotel>this.item).checkinTimeMt !== undefined;
    }
}