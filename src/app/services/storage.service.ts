import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IUserSession } from "app/contracts/IUserSession";
import { UserSession } from "app/classes/UserSession";

@Injectable()
export class StorageService {
  private sessionKey = 'th_suser';
  public loggedInUser: BehaviorSubject<IUserSession>;

  constructor() {
    this.loggedInUser = new BehaviorSubject<IUserSession>(this.getUser());
    window.addEventListener('signInState', (evt) => {
      this.storageEventHandler(evt);
    }, false);
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

  public setUser(user: IUserSession): void {
    if (user && user != null) {
      console.log(user);
      window.localStorage.setItem(this.sessionKey, JSON.stringify(user));
      this.loggedInUser.next(user);
    } else {
      this.clear();
      this.loggedInUser.next(null);
    }
  }

  public clear(): void {
    console.log('clearing user');
    window.localStorage.clear();
    this.loggedInUser.next(null);
  }

  private storageEventHandler(evt: any): void {
    const auth2 = (gapi as any).auth2.getAuthInstance();
    const isSignedIn = auth2.isSignedIn.get() as boolean;
    if (isSignedIn) {
      const profile = auth2.currentUser.get().getBasicProfile();
      const user = new UserSession(profile);
      this.setUser(user);
    } else {
      this.clear();
    }
  }

}
