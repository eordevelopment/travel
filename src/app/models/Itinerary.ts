import * as moment from 'moment';
import { TripDay } from 'app/models/TripDay';
import { Trip } from 'app/models/Trip';
import { TripDayItem } from 'app/models/TripDayItem';

export class Itinerary {
    public days: TripDay[];
    private trip: Trip;

    constructor(trip: Trip) {
        this.trip = trip;

        this.days = this.getDays(this.trip.fromMt, this.trip.toMt);

        if (this.trip.hasFlights()) {
            for (const flight of this.trip.flights) {
                const startDay = this.getDay(flight.departureTimeMt);
                const endDay = this.getDay(flight.arrivalTimeMt);
                startDay.items.push(new TripDayItem(flight.departureTimeMt, flight));
                if (endDay.date !== startDay.date) {
                    endDay.items.push(new TripDayItem(flight.arrivalTimeMt, flight));
                }
            }
        }

        if (this.trip.hasCarRentals) {
            for (const rental of this.trip.carRentals) {
                const startDay = this.getDay(rental.pickupTimeMt);
                const endDay = this.getDay(rental.dropOffTimeMt);
                startDay.items.push(new TripDayItem(rental.pickupTimeMt, rental));
                if (endDay.date !== startDay.date) {
                    endDay.items.push(new TripDayItem(rental.dropOffTimeMt, rental));
                }
            }
        }

        if (this.trip.hasHotels) {
            for (const hotel of this.trip.hotels) {
                const startDay = this.getDay(hotel.checkinTimeMt);
                startDay.items.push(new TripDayItem(hotel.checkinTimeMt, hotel));
            }
        }

        if (this.trip.hasActivities) {
            for (const activity of this.trip.activities) {
                const startDay = this.getDay(activity.startTimeMt);
                startDay.items.push(new TripDayItem(activity.startTimeMt, activity));

                if (activity.endTimeMt) {
                    const endDay = this.getDay(activity.endTimeMt);
                    if (endDay && endDay.date !== startDay.date) {
                        endDay.items.push(new TripDayItem(activity.endTimeMt, activity));
                    }
                }
            }
        }

        for (const day of this.days) {
            day.organiseItems();
        }
    }

    private getDays(startDate: moment.Moment, endDate: moment.Moment): TripDay[] {
        const dates = new Array();

        const currDate = moment(startDate).startOf('day');
        const lastDate = moment(endDate).startOf('day');

        dates.push(new TripDay(currDate.clone()));
        while (currDate.add(1, 'days').diff(lastDate) <= 0) {
            dates.push(new TripDay(currDate.clone()));
        }

        return dates;
    }

    private getDay(dateTime: moment.Moment): TripDay {
        const offset = (dateTime as any)._tzm;
        const localTime = dateTime.clone().utcOffset(offset);

        const date = localTime.format('LL');
        for (const day of this.days) {
            if (day.date === date) {
                return day;
            }
        }

        return undefined;
    }
}