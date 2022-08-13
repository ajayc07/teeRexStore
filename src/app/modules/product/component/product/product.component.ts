import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, takeWhile } from 'rxjs';
import { Product } from 'src/app/model/product-model';
import { CommunicationService } from 'src/app/service/communication.service';
import { StateManagementService } from 'src/app/service/state-management.service';
import { FilterService } from 'src/app/shared/component/filters/service/filter.service';

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  private _compActive: boolean = true;

  public showFilter: boolean = false;

  public productList: Array<Product> = [];

  public displayList: Array<Product> = [];

  public filterCount = 0;

  public filterFactors!: { [key: string]: any[] };

  public cartState: any;

  public refreshProductList = true;

  public searchValue = '';

  public doResetFilter: boolean = false;

  public isLoading: boolean = false;

  public showError: boolean = false;

  constructor(
    private stateManagementService: StateManagementService,
    private communicationService: CommunicationService,
    private filterService: FilterService,
  ) { }

  ngOnInit(): void {
    this.setupData();
  }

  ngOnDestroy(): void {
    this._compActive = false;
  }


  /**
   * Api call handling to get product details
   * @memberof ProductComponent
   */
  public setupData(): void {

    this.isLoading = true;

    this.communicationService.getProductData().subscribe((productData) => {
      this.productList = productData;
      this.resetProductList();
      this.filterFactors = this.filterService.getFilterData(this.productList);
      this.getCartState();
      this.showError = false;
    },
      () => {
        this.showError = true;
        this.isLoading = false;
      }
    )
  }


  /**
   *  Subject subscription to get state data
   * @memberof ProductComponent
   */
  public getCartState(): void {
    this.stateManagementService.getCartState().pipe(
      takeWhile(() => this._compActive)
    ).subscribe((data: any) => {
      this.cartState = data;
      if (this.refreshProductList) {
        this.updateProductList();
      }
    })
  }


  /**
   * updates the product list with cart quantity
   * @memberof ProductComponent
   */
  public updateProductList(): void {
    this.refreshProductList = false;
    this.cartState?.cartItem.map((data: Product) => {
      const foundProduct: any = this.displayList.find((product: Product) => product.id === data.id);
      if (foundProduct) {
        foundProduct.cartAddedQuantity = data?.cartAddedQuantity;
      }
    })
  }


  /**
   * Refreshes the product list
   * @memberof ProductComponent
   */
  public resetProductList(): void {
    this.displayList = JSON.parse(JSON.stringify(this.productList));
  }


  /**
   * Add the specific product to the cart and set the state to the service
   * @param {Product} product
   * @memberof ProductComponent
   */
  public addToCart(product: Product): void {

    product = this.updateItemCount(product);
    const cartItemIndex = this.cartState?.cartItem.findIndex((cartItem: Product) => product.id === cartItem.id);
    if (cartItemIndex === -1) {
      this.cartState?.cartItem.push(product);
    } else {
      this.cartState.cartItem[cartItemIndex] = product;
    }
    this.stateManagementService.setCartState({ ...this.cartState, cartItem: this.cartState.cartItem });
  }


  /**
   * Updates the product quantity
   * @param {Product} product
   * @return {*}  {Product}
   * @memberof ProductComponent
   */
  public updateItemCount(product: Product): Product {
    product.cartAddedQuantity = product.cartAddedQuantity ? product.cartAddedQuantity + 1 : 1;
    return product;
  }



  /**
   * Searches the product based on the key word
   * @param {*} keyWord
   * @memberof ProductComponent
   */
  public searchByKeyWord(keyWord: any): void {

    this.resetFilter();
    this.searchValue = keyWord;
    this.displayList = this.productList.filter(data => (data.name.toLowerCase()).includes(keyWord.toLowerCase()) ||
      (data.type.toLowerCase()).includes(keyWord.toLowerCase()) || (data.color.toLowerCase()).includes(keyWord.toLowerCase()));
    this.updateProductList();
  }


  /**
   * Applies the filter to the existing product list from the filter value object
   * @param {*} filterValue
   * @param {number} filterCount
   * @memberof ProductComponent
   */
  public applyFilter(filterValue: any, filterCount: number): void {
    this.doResetFilter = false;
    this.resetProductList();
    this.searchValue = '';
    this.filterCount = filterCount;
    this.displayList = this.productList.filter((data: any) => {
      return Object.keys(filterValue).every((key: any) => {
        return filterValue[key]?.length ? this.checkFilterPersistance(filterValue, data[key], key) : true
      });
    });
    this.updateProductList();
  }


  /**
   * Checks if the value meets filter criteria
   * @param {Array<any>} filterValue
   * @param {(string | number)} value
   * @param {*} key
   * @return {*}  {boolean}
   * @memberof ProductComponent
   */
  public checkFilterPersistance(filterValue: Array<any>, value: string | number, key: any): boolean {
    if (key === 'price') {
      const flatPrice = filterValue[key].flat();
      const [minPrice, maxPrice] = [Math.min(...flatPrice), Math.max(...filterValue[key].flat())];
      return minPrice <= value && value <= maxPrice;
    }

    return filterValue[key].includes(value)
  }


  /**
   * Clear's filter values and reset the list.
   * @memberof ProductComponent
   */
  public resetFilter(): void {
    this.filterCount = 0;
    this.doResetFilter = true;
    this.filterFactors = this.filterService.getFilterData(this.productList);
    this.resetProductList();
  }

}
