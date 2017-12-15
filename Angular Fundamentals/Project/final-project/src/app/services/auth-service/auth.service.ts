import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

const appKey : string = 'kid_SyYWLACWf';
const appSecret : string = '576524c10c2c4595ad3fbdc31e662a24';

@Injectable()
export class AuthService {
  emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private http: HttpClient) {
  }

  validateRegisterForm(username, email, password, repeatedPassword, wallet, iban) {
    if (username === '' || username === null || username === undefined || username.length < 4) {
      return {
        success: false,
        error: 'Username should be at least 4 characters long.'
      };
    }
    if (!this.emailRegex.test(email) || email === '' || email === null || email === undefined) {
      return {
        success: false,
        error: 'Invalid email.'
      };
    }
    if (password === '' || password === null || password === undefined || password.length < 4) {
      return {
        success: false,
        error: 'Password should be at least 4 characters long.'
      };
    }
    if (password !== repeatedPassword){
      return {
        success: false,
        error: 'Password do not match.'
      };
    }
    if (wallet.length != 34) {
      return {
        success: false,
        error: 'Bitcoin wallet token must be exactly 34 characters long.'
      };
    }
    if (iban.length < 16 && iban.length > 35) {
      return {
        success: false,
        error: 'IBAN must be between 16 and 35 characters long.'
      };
    }

    return {
      success: true,
      error: ''
    };
  }

  register(username, email, password, wallet, iban, bitBalance, eurBalance): Observable<any> {
    const body = JSON.stringify({name: username, username, email, password, isAdmin: false, wallet, iban, bitBalance, eurBalance});
    return this.http.post(`https://baas.kinvey.com/user/${appKey}/`, body, {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(`${appKey}:${appSecret}`))
        .set('Content-Type', 'application/json')
    });
  }

  login(username, password): Observable<any> {
    const body = JSON.stringify({username, password});
    return this.http.post(`https://baas.kinvey.com/user/${appKey}/login`, body, {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(`${appKey}:${appSecret}`))
        .set('Content-Type', 'application/json')
    });
  }

  getUserById(userId): Observable<any> { // getCurrentUser - old
    return this.http.get(`https://baas.kinvey.com/user/${appKey}/${userId}`, {
      headers: new HttpHeaders().set('Authorization', 'Kinvey ' + localStorage.getItem('authtoken'))
        .set('Content-Type', 'application/json')
    });
  }

  updateUserById(bitBalance, eurBalance, iban, wallet, email, name, userId): Observable<any> { 
    const body = JSON.stringify({bitBalance, eurBalance, iban, wallet, email, name, isAdmin: false});
    return this.http.put(`https://baas.kinvey.com/user/${appKey}/${userId}`, body, {
      headers: new HttpHeaders().set('Authorization', 'Kinvey ' + localStorage.getItem('authtoken'))
        .set('Content-Type', 'application/json')
    });
  }

  updateUserWithObj(userObj, userId): Observable<any> { 
    const body = JSON.stringify(userObj);
    return this.http.put(`https://baas.kinvey.com/user/${appKey}/${userId}`, body, {
      headers: new HttpHeaders().set('Authorization', 'Kinvey ' + localStorage.getItem('authtoken'))
        .set('Content-Type', 'application/json')
    });
  }
}
