import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

const CACHE_SIZE = 1;
const REFRESH_INTERVAL = 10000;

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  cache$: Observable<any>;

  constructor(private _http: HttpClient) {}

  makeCatFactCall() {
    if (!this.cache$) {
      const timer$ = timer(0, REFRESH_INTERVAL);
      this.cache$ = timer$.pipe(
        switchMap((_) => this.getCatFact()),
        shareReplay(CACHE_SIZE)
      );
    }

    return this.cache$;
  }

  getCatFact() {
    return this._http.get('https://catfact.ninja/fact');
  }
}
