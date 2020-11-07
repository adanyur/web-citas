import { Injectable } from '@angular/core';

import { Session } from '../models';

import {JwtHelperService} from '@auth0/angular-jwt'


@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private localStorageService: any;

  expired = new JwtHelperService();

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

  isAuthenticated() {
    const token = this.getToken();
    const user = this.getUsers();
    return (token && user) === null ? false : true;
  }

  removeSession() {
    this.localStorageService.clear();
  }

  getTokenExpired() {
    const token=this.localStorageService.getItem('TOKEN');
    return this.expired.isTokenExpired(token);
  }


}
