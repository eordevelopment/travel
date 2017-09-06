import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { environment } from '../../environments/environment';
import { ITrip } from 'app/contracts/ITrip';
import { ServiceError } from 'app/classes/ServiceError';
import { StorageService } from 'app/services/storage.service';

@Injectable()
export class TripService {
  private endpoint = 'trip';

  constructor(private http: Http, private storage: StorageService) {
    this.endpoint = environment.serviceUrl + 'trip';
  }

  public getTrips(): Observable<ITrip[]> {
    const headers = new Headers({ 'Authorization': `Basic ${this.storage.getToken()}` });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.endpoint, options)
      .map(response => response.json() as ITrip[])
      .catch(this.handleError);
  }

  private handleError(res: Response | any) {
    const error = new ServiceError();
    error.status = res.status;
    error.message = res.json().error;
    return Observable.throw(error);
  }
}