import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash'
import { Order } from '../service/order.service';

@Pipe({
  name: 'filterOrder'
})
export class FilterOrderPipe implements PipeTransform {

  transform(value: Array<Order>, key?: string){
    let result;
    if(key && key !== ''){
      result = _.filter(value,(item:Order)=>item.status === key)
    } else {
      result = value
    }
    return result;
  }

}
