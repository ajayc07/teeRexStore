import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Product } from 'src/app/model/product-model';
import { CommunicationService } from 'src/app/service/communication.service';
import { StateManagementService } from 'src/app/service/state-management.service';
import { FiltersComponent } from 'src/app/shared/component/filters/filters.component';
import { FilterService } from 'src/app/shared/component/filters/service/filter.service';
import { SearchComponent } from 'src/app/shared/component/search/search.component';
import { ProductCardComponent } from '../product-card/product-card.component';

import { ProductComponent } from './product.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  let stateManagementService: StateManagementService;
  let communicationService: CommunicationService;
  let filterService: FilterService;
  let mockData: Product[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent, FiltersComponent, SearchComponent, ProductCardComponent ],
      imports: [FormsModule, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  beforeEach(() => {
    stateManagementService = TestBed.inject(StateManagementService);
    communicationService = TestBed.inject(CommunicationService);
    filterService = TestBed.inject(FilterService);
    mockData = [
      {
        "id": 1,
        "imageURL": "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/polo-tshirts.png",
        "name": "Black Polo",
        "type": "Polo",
        "price": 250,
        "currency": "INR",
        "color": "Black",
        "gender": "Men",
        "quantity": 3
      },
      {
        "id": 2,
        "imageURL": "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/polo-tshirts.png",
        "name": "Blue Polo",
        "type": "Polo",
        "price": 350,
        "currency": "INR",
        "color": "Blue",
        "gender": "Women",
        "quantity": 3
      },
      {
        "id": 3,
        "imageURL": "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/polo-tshirts.png",
        "name": "Pink Polo",
        "type": "Polo",
        "price": 350,
        "currency": "INR",
        "color": "Pink",
        "gender": "Women",
        "quantity": 6
      }
    ];
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set incital data and call intializer functions', () => {

    spyOn(communicationService, 'getProductData').and.returnValue(of(mockData));
    spyOn(component, 'resetProductList').and.callFake;
    spyOn(component, 'getCartState').and.callFake;
    spyOn(filterService, 'getFilterData').and.callFake;

    component.ngOnInit();

    expect(component.productList).toBeDefined();
    expect(component.resetProductList).toHaveBeenCalled();
    expect(filterService.getFilterData).toHaveBeenCalledWith(component.productList);
    expect(component.getCartState).toHaveBeenCalled();
  });

  it('should define cart item', () => {

    spyOn(stateManagementService, 'getCartState').and.returnValue(of(mockData));
    spyOn(component, 'updateProductList').and.callFake;

    component.getCartState();
    component.refreshProductList = true;

    expect(component.cartState.length).toBeTruthy;
    expect(component.updateProductList).toHaveBeenCalled();
  });

  it('should update product list', () => {
    

    component.updateProductList();

    component.refreshProductList = true;
    component.displayList = mockData;

  
    expect(component.refreshProductList).toBeFalse;
    expect(component.displayList[0].cartAddedQuantity).toBeDefined;
  });

  
  it('should update the cart', () => {

    const addedQuantityMock: Product = {...mockData[0], cartAddedQuantity: 1};
    spyOn(component, 'updateItemCount').and.returnValue(addedQuantityMock);
    spyOn(stateManagementService, 'setCartState').and.callFake;

    component.cartState = {
      cartItem: [mockData[0]]
    }
    component.addToCart(mockData[0]);

    expect(component.updateItemCount).toHaveBeenCalled();
    expect(stateManagementService.setCartState).toHaveBeenCalled();

  });

  it('should add to the cart', () => {

    const addedQuantityMock: Product = {...mockData[0], cartAddedQuantity: 1};
    spyOn(component, 'updateItemCount').and.returnValue(addedQuantityMock);
    spyOn(stateManagementService, 'setCartState').and.callFake;

    component.cartState = {
      cartItem: [mockData[1]]
    }

    component.addToCart(mockData[2]);

    expect(component.cartState.cartItem.length).toBe(2);
    expect(component.updateItemCount).toHaveBeenCalled();
    expect(stateManagementService.setCartState).toHaveBeenCalled();

  });

  it('should update cart item count', () => {
    component.updateItemCount(mockData[0]);
    expect(mockData[0].cartAddedQuantity).toBe(1);
  });

  it('should increase cart item count', () => {
    const mockProduct = {...mockData[0], cartAddedQuantity: 1}
    component.updateItemCount(mockProduct);
    expect(mockProduct.cartAddedQuantity).toBe(2);
  });

  it('should apply filter',() => {

    spyOn(component, 'resetProductList').and.callFake;

    component.productList = mockData;
    const mockFilterValue = {
      color: ['Black'],
      type: [],
      gender: [],
      price: []
    }

    component.applyFilter(mockFilterValue, 1);

    expect(component.resetProductList).toHaveBeenCalled();
    expect(component.searchValue).toBe('');
    expect(component.filterCount).toBeDefined;
    expect(component.displayList.length).toBe(1);
  })

  it('should clear filter', ()=> {
    spyOn(component, 'resetProductList').and.callFake;

    component.resetFilter();

    expect(component.resetProductList).toHaveBeenCalled();
    expect(component.filterCount).toBe(0);
  });

  it('should search for product with search key word', () => {
    spyOn(component, 'resetProductList').and.callFake;
    component.productList = [...mockData];

    component.searchByKeyWord('pink');

    expect(component.resetProductList).toHaveBeenCalled();
    expect(component.searchValue).toBe('pink');
    expect(component.displayList.length).toBe(1);
  })

});
