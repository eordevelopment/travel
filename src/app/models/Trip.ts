import * as moment from 'moment';
import { ITrip } from 'app/contracts/ITrip';
import { Flight } from 'app/models/Flight';
import { ICarRental } from 'app/contracts/ICarRental';
import { IHotel } from 'app/contracts/IHotel';
import { IActivity } from 'app/contracts/IActivity';
import { CarRental } from 'app/models/CarRental';
import { Hotel } from 'app/models/Hotel';
import { Activity } from 'app/models/Activity';

export class Trip implements ITrip {
    public id: string;
    public name: string;
    public from: string;
    public to: string;
    public key: string;
    public flights: Flight[];
    public carRentals: CarRental[];
    public hotels: Hotel[];
    public activities: Activity[];

    public fromMt: moment.Moment;
    public toMt: moment.Moment;

    constructor(source?: ITrip) {
        if (source) {
            this.id = source.id;
            this.name = source.name;
            this.from = source.from;
            this.to = source.to;
            this.key = source.key;
            this.fromMt = moment(source.from);
            this.toMt = moment(source.to);

            this.flights = new Array();
            if (source.flights && source.flights != null) {
                for (const flight of source.flights) {
                    this.flights.push(new Flight(flight));
                }
            }

            this.carRentals = new Array();
            if (source.carRentals && source.carRentals != null) {
                for (const rental of source.carRentals) {
                    this.carRentals.push(new CarRental(rental));
                }
            }

            this.hotels = new Array();
            if (source.hotels && source.hotels != null) {
                for (const hotel of source.hotels) {
                    this.hotels.push(new Hotel(hotel));
                }
            }

            this.activities = new Array();
            if (source.activities && source.activities != null) {
                for (const activity of source.activities) {
                    this.activities.push(new Activity(activity));
                }
            }
        }
    }

    public hasFlights(): boolean {
        if (this.flights && this.flights != null && this.flights.length > 0) {
            return true;
        }
        return false;
    }

    public hasHotels(): boolean {
        if (this.hotels && this.hotels != null && this.hotels.length > 0) {
            return true;
        }
        return false;
    }

    public hasCarRentals(): boolean {
        if (this.carRentals && this.carRentals != null && this.carRentals.length > 0) {
            return true;
        }
        return false;
    }

    public hasActivities(): boolean {
        if (this.activities && this.activities != null && this.activities.length > 0) {
            return true;
        }
        return false;
    }

    public isUpcoming(): boolean {
        const now = moment();
        if (now.isBefore(this.fromMt)) {
            return true;
        }
        return false;
    }

    public daysUntilDeparture(): number {
        return this.fromMt.diff(moment(), 'days');
    }

    public totalFlightTime(): number {
        let total = 0;
        for (const flight of this.flights) {
            total += flight.getDuration();
        }
        return Math.round(total / 3600000);
    }

    public totalHotelNights(): number {
        let total = 0;
        for (const hotel of this.hotels) {
            total += hotel.numNights;
        }
        return total;
    }

    public totalCarRental(): number {
        let total = 0;
        for (const rental of this.carRentals) {
            total += rental.getDuration();
        }
        return Math.round(total / 86400000);
    }
}
