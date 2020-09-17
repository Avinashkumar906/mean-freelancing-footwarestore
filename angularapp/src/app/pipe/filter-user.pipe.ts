import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../service/user.service';
import * as _ from 'lodash'

@Pipe({
  name: 'filterUser'
})
export class FilterUserPipe implements PipeTransform {

  transform(value: Array<User>, key?: string) {
    let result;
    if(key && key !== ''){
      result = _.filter(value,(user:User)=>user.role === key)
    } else {
      result = value;
    }
    return result;
  }

}
