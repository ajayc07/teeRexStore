import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update filter by adding values', () => {
    const event = {
      checked: true
    };

    spyOn(component, 'addFilterElement').and.returnValue(['Black']);

    component.updateFilter(event, 'Black', 'color');

    expect(component.filterCount).toBe(1);
    expect(component.filterValues['color'][0]).toBe('Black');
    expect(component.addFilterElement).toHaveBeenCalled();
  });

  it('should update filter by removing values', () => {
    const event = {
      checked: false
    };

    spyOn(component, 'removeFilterElement').and.returnValue(['Pink', 'Yellow']);
    component.filterValues = {
      color: ['Black', 'Pink', 'Yellow'],
      gender: [],
      price: [],
      type: []
    }

    component.updateFilter(event, 'Black', 'color');

    expect(component.filterCount).toBe(1);
    expect(component.filterValues['color'][0]).toBe('Pink');
    expect(component.filterValues['color'].length).toBe(2);
    expect(component.removeFilterElement).toHaveBeenCalled();
  });

  it('should add filter', () => {
    const result = component.addFilterElement('Black', 'color');
    expect(result[0]).toBe('Black')
  });

  it('should remove filter', () => {

    component.filterValues = {
      color: ['Black', 'Pink', 'Yellow'],
      gender: [],
      price: [],
      type: []
    };

    const result = component.removeFilterElement('Black', 'color');
    expect(result.length).toBe(2);
    expect(result[0]).toBe('Pink')
  })

  it('should reset all filter value', () => {
    spyOn(component.clearFilterValues, 'emit').and.callFake;

    component.clearFilter();

    expect(component.filterCount).toBe(0);
    expect(component.clearFilterValues.emit).toHaveBeenCalled;
  });

  it('should reset all filter value', () => {
    spyOn(component.hideFilter, 'emit').and.callFake;

    component.hideFilterEmitter();

    expect(component.hideFilter.emit).toHaveBeenCalled;
  });
  
});
