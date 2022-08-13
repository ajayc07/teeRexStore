import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FilterService } from './service/filter.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnChanges {

  @Input()
  public itemCount: number = 0;

  @Input()
  public filterFactors!: { [key: string]: any[] };

  @Input()
  public showFilter!: boolean;

  @Input()
  public resetFilter!: boolean;

  @Output()
  public applyFilterValues = new EventEmitter();

  @Output()
  public clearFilterValues = new EventEmitter();

  @Output()
  public hideFilter = new EventEmitter();


  public filterValues: any = {
    color: [],
    gender: [],
    price: [],
    type: []
  }

  public filterCountCollection: any = {};

  public filterCount: any;

  constructor(
    private filterService: FilterService
  ) { }

  
  /**
   * Angular life cycle
   * @param {SimpleChanges} changes
   * @memberof FiltersComponent
   */
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['resetFilter']?.currentValue) {
      this.filterValues = {color: [],gender: [],price: [],type: []};
    }
  }

  ngOnInit(): void {
  }


  /**
   * Updates the filter array based on filter select and de-select
   * Emits the filter array to parent
   * @param {*} event
   * @param {string} filterItem
   * @param {*} filterGroup
   * @memberof FiltersComponent
   */
  public updateFilter(event: any, filterItem: string, filterGroup: any): void {

    this.filterValues[filterGroup] = event.checked ? this.addFilterElement(filterItem, filterGroup) : this.removeFilterElement(filterItem, filterGroup);
    this.filterCountCollection = { ...this.filterCountCollection, [filterGroup]: !!this.filterValues[filterGroup]?.length };
    this.filterCount = Object.values(this.filterCountCollection).reduce((acc: any, curr: any) => acc + curr, 0);

    this.applyFilterValues.emit({ filterValues: this.filterValues, filterCount: this.filterCount });
  }

  /**
   * Add filter item to filter arrray when filter item is selected
   * @param {string} filterItem
   * @param {string} filterGroup
   * @return {*} 
   * @memberof FiltersComponent
   */
  public addFilterElement(filterItem: string, filterGroup: string) {
    return [...this.filterValues[filterGroup], filterItem]
  }


  /**
   * Removes filter item from filter arrray when filter item is de-selected
   * @param {string} filterItem
   * @param {string} filterGroup
   * @return {*} 
   * @memberof FiltersComponent
   */
  public removeFilterElement(filterItem: string, filterGroup: string) {
    const removeItemIndex = this.filterValues[filterGroup]?.findIndex((data: any) => data === filterItem);
    this.filterValues[filterGroup].splice(removeItemIndex, 1);
    return this.filterValues[filterGroup];
  }


  /**
   * Resets all filter value
   * @memberof FiltersComponent
   */
  public clearFilter(): void {

    this.filterFactors = JSON.parse(JSON.stringify(this.filterService.filterFactors));
    this.filterValues = {color: [],gender: [],price: [],type: []};

    this.filterCount = 0;
    this.clearFilterValues.emit(true);
  }


  /**
   * Hides filter in mobile view
   * @memberof FiltersComponent
   */
  public hideFilterEmitter(): void {
    this.hideFilter.emit()
  }

}
