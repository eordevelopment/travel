import * as moment from 'moment';

import { CarRental } from 'app/models/CarRental';
import { Hotel } from 'app/models/Hotel';
import { Activity } from 'app/models/Activity';
import { Flight } from 'app/models/Flight';

export class TripDay {
    public date: string;
    public dateMt: moment.Moment;

    public flights: Flight[];
    public carRentals: CarRental[];
    public hotels: Hotel[];
    public activities: Activity[];

    constructor(date: moment.Moment) {
        this.dateMt = date;
        this.date = date.format('LL');

        this.flights = new Array();
        this.carRentals = new Array();
        this.hotels = new Array();
        this.activities = new Array();
    }

    public hasFlights(): boolean {
        if (this.flights.length > 0) {
            return true;
        }
        return false;
    }
}