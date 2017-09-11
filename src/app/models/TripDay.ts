import * as moment from 'moment';
import { TripDayItem } from 'app/models/TripDayItem';

export class TripDay {
    public date: string;
    public dateMt: moment.Moment;
    public items: TripDayItem[];

    constructor(date: moment.Moment) {
        this.dateMt = date;
        this.date = date.format('LL');

        this.items = new Array();
    }

    public hasItems(): boolean {
        if (this.items && this.items != null && this.items.length > 0) {
            return true;
        }
        return false;
    }

    public organiseItems(): void {
        this.items.sort(this.sortAsc);
    }

    private sortAsc(a: TripDayItem, b: TripDayItem): number {
        if (a.dateMt.valueOf() < b.dateMt.valueOf()) {
            return -1;
        }
        if (a.dateMt.valueOf() > b.dateMt.valueOf()) {
            return 1;
        }
        return 0;
    }
}