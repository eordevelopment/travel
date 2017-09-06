import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { StorageService } from './storage.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  canActivate() {
    if (this.storageService.hasAccessToken()) {
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
}