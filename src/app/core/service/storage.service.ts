import { Injectable } from '@angular/core';

import { Session } from '../models';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private localStorageService: any;

  constructor() {
    this.localStorageService = localStorage;
  }

  setSession(data: Session): void {
    this.localStorageService.setItem('TOKEN', data.token);
    this.localStorageService.setItem('USERS', JSON.stringify(data.users));
  }

  getToken() {
    return this.localStorageService.getItem('TOKEN');
  }

  getUsers() {
    return JSON.parse(this.localStorageService.getItem('USERS'));
  }

  removeSession() {
    this.localStorageService.removeItem('TOKEN');
    this.localStorageService.removeItem('USERS');
  }
}
