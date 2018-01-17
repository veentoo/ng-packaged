import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { pipe } from 'ramda';

@Injectable()
export class BarService {

  get value(): Observable<string> {
    this.ram();
    return Observable.of(true)
      .map((val) => `${val}`);
  }

  ram() {
    pipe(() => {});
  }

}
