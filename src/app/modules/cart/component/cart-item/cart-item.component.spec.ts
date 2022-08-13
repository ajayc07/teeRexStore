import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemComponent } from './cart-item.component';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit delete event to parent on button click', () => {
    
    spyOn(component.deleteCart, 'emit');

    const nativeEl: HTMLElement = fixture.nativeElement;
    const delButton = nativeEl.querySelector('button');
    delButton?.dispatchEvent(new Event('click'));

    expect(component.deleteCart.emit).toHaveBeenCalled();
  });

  
  it('should emit update event to parent', () => {

    spyOn(component.updateCart, 'emit');
    component.updateItemCount(true);
    expect(component.updateCart.emit).toHaveBeenCalled();
    expect(component.updateCart.emit).toHaveBeenCalledWith(true);
  });
});
