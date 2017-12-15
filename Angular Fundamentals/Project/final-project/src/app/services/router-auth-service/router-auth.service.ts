import { Injectable } from '@angular/core';

@Injectable()
export class RouterAuthService {

  constructor() {}
  canAccess(){
    return localStorage.getItem('role') === 'user';
  }
}
