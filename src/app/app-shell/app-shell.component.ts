import 'rxjs/add/operator/filter';
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Location, PopStateEvent } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

import { StorageService } from 'app/services/storage.service';
import { IUserSession } from 'app/contracts/IUserSession';
import { ITrip } from 'app/contracts/ITrip';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.less']
})
export class AppShellComponent implements AfterViewInit {
  @ViewChild('mdlTravelLayout') layout: ElementRef;

  public loggedInUser: IUserSession;
  public currentTrip: ITrip;

  private lastPoppedUrl: string;

  constructor(private storage: StorageService, private router: Router, private location: Location) { }

  ngAfterViewInit() {
    this.storage.loggedInUser.subscribe(value => {
      setTimeout(() => {
        this.loggedInUser = value;
      });
    });

    this.storage.currentTrip.subscribe(value => {
      setTimeout(() => {
        this.currentTrip = value;
        console.log(this.currentTrip);
      });
    });

    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
      // console.log(this.lastPoppedUrl);
      // if (this.lastPoppedUrl === '/home') {
      //   console.log("Clearing trip");
      //   this.storage.setTrip();
      // }
    });

    this.router.events.filter(event => event instanceof NavigationEnd).subscribe((evt: NavigationEnd) => {
      if (evt.url === this.lastPoppedUrl) {
        this.lastPoppedUrl = undefined;
      } else {
        window.scrollTo(0, 0);
      }
      (this.layout as any).closeDrawer();
    });
  }

  public logout(): void {
    const auth2 = (gapi as any).auth2.getAuthInstance();
    auth2.signOut().then(() => this.storage.clear);
    (this.layout as any).closeDrawer();
  }

}