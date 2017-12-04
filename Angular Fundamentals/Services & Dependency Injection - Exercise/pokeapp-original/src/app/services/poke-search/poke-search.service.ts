import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';

const baseUrl = 'http://localhost:5000';

@Injectable()
export class PokeSearchService {

  constructor(private http: HttpClient) { }

  debouncePokemons(e) {
    return e.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(result => this.getPokemons(result));
  }

  getPokemons(payload) {
    return this.http.get(baseUrl + `/pokedex?pokename=${payload}`);
  }

}
