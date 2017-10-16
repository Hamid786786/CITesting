/**
 *  Sorts an array of objects on one of its properties.
 *  Alternates between ascending and descending with each invocation
 *  of sort().
 */

import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SorterService {
  private lastProperty: string = null;
  private direction: number = 1;
  private reversed: boolean = false;

  constructor() {
    // console.log('Instantiated SorterService');
  }

  // Optional param 'toggle' indicates if direction is to be reversed
  public sort(collection: any[], prop: string, toggle: boolean = true) {
    if (toggle) {
      this.toggleDirection(prop);
    }
    this.lastProperty = prop;

    collection.sort((a: any, b: any) => {
      let aVal: any;
      let bVal: any;

      // Handle resolving nested properties such as 'state.name' for prop parameter
      if (prop && prop.indexOf('.')) {
        aVal = this.resolveProperty(prop, a);
        bVal = this.resolveProperty(prop, b);
      } else {
        aVal = a[prop];
        bVal = b[prop];
      }

      // Fix issues that spaces before/after string value can cause such as ' San Francisco'
      if (this.isString(aVal)) {
        aVal = aVal.trim().toUpperCase();
      }
      if (this.isString(bVal)) {
        bVal = bVal.trim().toUpperCase();
      }

      if (aVal < bVal) {
        return this.direction * -1;
      } else if (aVal > bVal) {
        return this.direction;
      } else {
        return 0;
      }
    });
  }

  // Exposed to components in order to determine direction as bool
  public isReversed(): boolean {
    return this.reversed;
  }

  public isString(val: any): boolean {
    return (val && (typeof val === 'string' || val instanceof String));
  }

  public resolveProperty(path: string, obj: any) {
    return path.split('.').reduce((prev, curr) => {
      return (prev ? prev[curr] : undefined);
    }, obj || self);
  }

  // If sort property switched (e.g. different column), reset direction
  // to ascending. Otherwise, toggle direction.
  private toggleDirection(prop: any): void {
    if (this.lastProperty === prop) {
      this.direction *= -1;
      this.reversed = !this.reversed;
    } else {
      this.direction = 1;
      this.reversed = false;
    }
  }
}
