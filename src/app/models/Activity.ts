import * as moment from 'moment';
import { Coord } from 'app/contracts/Coord';
import { Link } from 'app/contracts/Link';
import { IActivity } from 'app/contracts/IActivity';

export class Activity implements IActivity {
    public name: string;
    public description: string;
    public startTime: string;
    public endTime: string;
    public Location: Coord;
    public note: string;
    public links: Link[];

    public startTimeMt: moment.Moment;
    public endTimeMt: moment.Moment;

    constructor(source?: IActivity) {
        if (source) {

            this.name = source.name;
            this.description = source.description;
            this.startTime = source.startTime;
            this.Location = source.Location;
            this.note = source.note;
            this.links = source.links;
            this.endTime = source.endTime;

            this.startTimeMt = moment(source.startTime);
            if (source.endTime) {
                this.endTimeMt = moment(source.endTime);
            }
        }
    }

    public hasStartTime(): boolean {
        if(this.startTime && this.startTime != null) {
            return true;
        }

        return false;
    }

    public hasEndTime(): boolean {
        if(this.endTime && this.endTime != null) {
            return true;
        }

        return false;
    }
}
