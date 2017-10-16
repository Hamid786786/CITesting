import {Component, Output} from '@angular/core';

import {FilterTextService} from '@pl-core/_services';

@Component({
  selector: 'pl-filter-text',
  templateUrl: './filter-text.component.html'
})

export class FilterTextComponent {
  public filter: string;

  constructor(private _filterTextService: FilterTextService) {
  }

  public onFilterChange(event: any) {
    event.preventDefault();
    this._filterTextService.updateFilter(this.filter);
  }

  public clear() {
    this.filter = '';
  }
}
