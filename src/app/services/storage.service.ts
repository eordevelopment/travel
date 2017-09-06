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

@Injectable()
export class StorageService {
  private sessionKey = 'th_suser';
  public loggedInUser: BehaviorSubject<IUserSession>;

  constructor(private http: Http) {
    this.loggedInUser = new BehaviorSubject<IUserSession>(this.getUser());
    window.addEventListener('signInState', (evt) => {
      this.storageEventHandler(evt);
    }, false);
  }

  public getToken(): string {
    const user = this.getUser();
    if (!user || user == null) {
      return null;
    }
    return user.userToken;
  }

  public getUser(): IUserSession {
    let userJson = window.localStorage.getItem(this.sessionKey);

    if (!userJson || userJson == null) {
      userJson = null;
      window.localStorage.removeItem(this.sessionKey);
      return null;
    }

    return JSON.parse(userJson);
  }

  public clear(): void {
    console.log('clearing user');
    window.localStorage.clear();
    this.loggedInUser.next(null);
  }

  private setUser(user: IUserSession): void {
    if (user && user != null) {
      const currentUser = this.getUser();
      if (currentUser != null && currentUser.id === user.id) {
        user.userToken = currentUser.userToken;
      }

      console.log(user);
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