import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class FilterTextService {
  public filterObs: Observable<string>;

  private filter$ = new Subject<string>();

  constructor() {
    this.filterObs = this.filter$.asObservable();
  }

  // Called when filter component input box changes
  // Publishes/pushes new filter query string
  public updateFilter(query: string): void {
    this.filter$.next(query);
  }

  public filter(query: string, props: string[], sourceList: any[]): any[] {
    let filteredList: any[];

    if (query && props && sourceList) {
      query = query.toLowerCase();

      let filtered = sourceList.filter((item) => {
        let match = false;
        for (let prop of props) {
          if (item[prop].toString().toLowerCase().indexOf(query) > -1) {
            match = true;
            break;
          }
        }
        return match;
      });

      filteredList = filtered;
    } else {
      filteredList = sourceList;
    }

    return filteredList;
  }
}
