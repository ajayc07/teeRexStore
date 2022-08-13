import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input()
  public searchValue: any;

  @Output() 
  search = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }


  /**
   * Emits the search input 
   * @param {*} event
   * @memberof SearchComponent
   */
  public emitSearch(event: any) {
    this.search.emit(event?.target?.value ?? '')
  }

}
