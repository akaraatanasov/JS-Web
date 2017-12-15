import {Injectable} from '@angular/core';
import {AdminService} from "../admin/admin.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

const appKey : string = 'kid_SyYWLACWf';
const appSecret : string = '576524c10c2c4595ad3fbdc31e662a24';

@Injectable()
export class OfferService {
  
  constructor(private adminService: AdminService, private http: HttpClient) {
  }

  getOffers(): Observable<any> {
    return this.http.get(`https://baas.kinvey.com/appdata/${appKey}/offers`, {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(`${this.adminService.getAdminCredentials().username}:${this.adminService.getAdminCredentials().password}`))
        .set('Content-Type', 'application/json')
    });
  }

  addOffer(bitValue, eurValue, acceptsBargains, status): Observable<any> {
    const body = JSON.stringify({bitValue, eurValue, acceptsBargains, status});
    return this.http.post(`https://baas.kinvey.com/appdata/${appKey}/offers`, body, {
      headers: new HttpHeaders().set('Authorization', 'Kinvey ' + localStorage.getItem('authtoken'))
        .set('Content-Type', 'application/json')
    });
  }

  getOfferById(id): Observable<any> {
    return this.http.get(`https://baas.kinvey.com/appdata/${appKey}/offers/${id}`, {
      headers: new HttpHeaders().set('Authorization', 'Kinvey ' + localStorage.getItem('authtoken')) //'Basic ' + btoa(`${this.adminService.getAdminCredentials().username}:${this.adminService.getAdminCredentials().password}`))
        .set('Content-Type', 'application/json')
    });
  }

  updateOfferById(bitValue, eurValue, acceptsBargains, status, id): Observable<any> {
    const body = JSON.stringify({bitValue, eurValue, acceptsBargains, status});
    return this.http.put(`https://baas.kinvey.com/appdata/${appKey}/offers/${id}`, body, {
      headers: new HttpHeaders().set('Authorization', 'Kinvey ' + localStorage.getItem('authtoken'))
        .set('Content-Type', 'application/json')
    });
  }

  deleteOfferById(id): Observable<any> {
    return this.http.delete(`https://baas.kinvey.com/appdata/${appKey}/offers/${id}`, {
      headers: new HttpHeaders().set('Authorization', 'Kinvey ' + localStorage.getItem('authtoken'))
    });
  }

}