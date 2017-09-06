import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { environment } from '../../environments/environment';

import { IUserSession } from 'app/contracts/IUserSession';
import { UserSession } from 'app/classes/UserSession';
import { ServiceError } from 'app/classes/ServiceError';
import { LoginDto } from 'app/classes/LoginDto';
import { ITrip } from 'app/contracts/ITrip';

@Injectable()
export class StorageService {
  private sessionKey = 'th_suser';
  private tripKey = 'th_ctrip';

  public loggedInUser: BehaviorSubject<IUserSession>;
  public currentTrip: BehaviorSubject<ITrip>;

  constructor(private http: Http) {
    this.loggedInUser = new BehaviorSubject<IUserSession>(this.getUser());
    this.currentTrip = new BehaviorSubject<ITrip>(this.getTrip());

    window.addEventListener('signInState', (evt) => {
      this.storageEventHandler(evt);
    }, false);
  }

  public hasAccessToken(): boolean {
    const token = this.getToken() as string;
    if (token && token !== null) {
      return true;
    }
    return false;
  }

  public getToken(): string {
    const user = this.getUser();
    if (!user || user == null) {
      return null;
    }
    return user.userToken;
  }

  public clear(): void {
    window.localStorage.clear();
    this.loggedInUser.next(null);
  }

  public setTrip(trip?: ITrip): void {
    if (trip && trip != null) {
      window.localStorage.setItem(this.tripKey, JSON.stringify(trip));
      this.currentTrip.next(trip);
    } else {
      window.localStorage.removeItem(this.tripKey);
      this.currentTrip.next(null);
    }

  }

  public getTrip(): ITrip {
    let tripJson = window.localStorage.getItem(this.tripKey);

    if (!tripJson || tripJson == null) {
      tripJson = null;
      window.localStorage.removeItem(this.tripKey);
      return null;
    }

    return JSON.parse(tripJson);
  }

  private getUser(): IUserSession {
    let userJson = window.localStorage.getItem(this.sessionKey);

    if (!userJson || userJson == null) {
      userJson = null;
      window.localStorage.removeItem(this.sessionKey);
      return null;
    }

    return JSON.parse(userJson);
  }

  private setUser(user: IUserSession): void {
    if (user && user != null) {
      const currentUser = this.getUser();
      if (currentUser != null && currentUser.id === user.id) {
        user.userToken = currentUser.userToken;
      }

      window.localStorage.setItem(this.sessionKey, JSON.stringify(user));
      this.loggedInUser.next(user);

      if (!user.userToken || user.userToken == null) {
        this.login(new LoginDto(user.googleToken))
          .subscribe(response => {
            user.userToken = response;
            console.log(user);
            window.localStorage.setItem(this.sessionKey, JSON.stringify(user));
            this.loggedInUser.next(user);
          },
          (error: any) => this.handleError(error));
      }

    } else {
      this.clear();
      this.loggedInUser.next(null);
    }
  }

  private storageEventHandler(evt: any): void {
    const auth2 = (gapi as any).auth2.getAuthInstance();
    const isSignedIn = auth2.isSignedIn.get() as boolean;
    if (isSignedIn) {
      const currentUser = auth2.currentUser.get();
      const profile = currentUser.getBasicProfile();
      const user = new UserSession(profile);
      user.googleToken = currentUser.getAuthResponse().id_token;
      this.setUser(user);
    } else {
      this.clear();
    }
  }

  private login(dto: LoginDto): Observable<string> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({ headers: headers });

    return this.http.post(environment.serviceUrl + 'account/login', dto, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response): string {
    return res.text();
  }

  private handleError(res: Response | any) {
    const error = new ServiceError();
    error.status = res.status;
    error.message = res.json().error;
    return Observable.throw(error);
  }

}