import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Product } from 'src/app/model/product-model';
import { StateManagementService } from 'src/app/service/state-management.service';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  let stateManagementService: StateManagementService;

  const mockData: Product[] = [{
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
  }]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    stateManagementService = TestBed.inject(StateManagementService);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCartState', () => {
    spyOn(component, 'getCartState');
    component.ngOnInit();
    expect(component.getCartState).toHaveBeenCalled();
  });

  it('should get data from state service', () => {

    spyOn(stateManagementService, 'getCartState').and.returnValue(of({cartItem: mockData, cartItemCount: 3}));
    spyOn(component, 'getCartState').and.callThrough();
    component.ngOnInit();
    expect(component.cartItem).toBeDefined();
    expect(component.cartItemCount).toBe(3);
  });

  it('should increate cart item quantity', () => {
    component.cartItem = mockData;
    mockData[0].cartAddedQuantity = 1;
    component.updateCartItemCount(true, mockData[0]);
    expect(mockData[0].cartAddedQuantity).toBe(2);
  });

  it('should decrease cart item quantity', () => {
    component.cartItem = mockData;
    mockData[0].cartAddedQuantity = 1;
    component.updateCartItemCount(false, mockData[0]);
    expect(mockData[0].cartAddedQuantity).toBe(0);
  });

  it('should remove from cart when deleted', () => {
    component.cartItem = mockData;
    component.deleteCartItem(2);
    expect(component.cartItem.length).toBe(2);
  });

});
