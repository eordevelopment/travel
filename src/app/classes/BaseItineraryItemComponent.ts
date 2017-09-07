import * as moment from 'moment';

export abstract class BaseItineraryItemComponent {
    public toLocalTime(datetime: moment.Moment): string {
        const offset = (datetime as any)._tzm;
        const localTime = datetime.clone();
        return localTime.utcOffset(offset).format('HH:mm')
    }

    public isSameDay(targetDate: moment.Moment, itemDate: moment.Moment): boolean {
        const offset = (itemDate as any)._tzm;
        const localTime = itemDate.clone().utcOffset(offset);


        const itemDateStr = localTime.format('LL');
        const date = targetDate.format('LL');
        return itemDateStr === date;
      }
}