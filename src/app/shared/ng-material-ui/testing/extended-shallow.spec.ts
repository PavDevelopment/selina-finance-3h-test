import { Type } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Shallow } from 'shallow-render';
import { provideMockStore } from './store.mock.spec';

export class ExtendedShallow<TTestComponent> extends Shallow<TTestComponent> {
  constructor(testComponent: Type<TTestComponent>, testModule: Type<any>) {
    super(testComponent, testModule);
  }

  provideStore(
    selectorStubs: {
      selector: (...args: any[]) => any;
      mockedValue: any | Observable<any>;
    }[] = []
  ) {
    return this.provide([provideMockStore(selectorStubs)]).dontMock(Store);
  }
}
