import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../service/product.service';
import * as _ from 'lodash'

@Pipe({
  name: 'searchProduct'
})
export class SearchProductPipe implements PipeTransform {

  transform(value: Array<Product>, key:string) {
    let result;
    if(key && key !== ''){
      result = _.filter(value,(item:Product)=>{
        return item.name.toLowerCase().includes(key.toLowerCase())
      })
    } else {
      result = value;
    }
    return result;
  }

}
