import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  public filterFactors: { [key: string]: any[] } = {
    color: [],
    gender: [],
    price: [],
    type: []
  };

  constructor() { }

  public getFilterData(productList: Array<any>) {

    const filterKeys = ['color', 'gender', 'price', 'type'];

    const factors: any = JSON.parse(JSON.stringify(this.filterFactors));

    productList.map((product: any) => {
      filterKeys.map((key: string) => {
        if (!factors[key]?.includes(product[key])) {
          factors[key].push(product[key])
        }
      })
    });

    factors['price'] = [[0, 250], [251, 450], [450, 500]];

    return factors;

  }


}
