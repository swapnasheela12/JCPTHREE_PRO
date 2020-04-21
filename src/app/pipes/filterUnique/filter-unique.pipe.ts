import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash'; 
@Pipe({
  name: 'filterUnique',
  pure: false
})
export class FilterUniquePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    // Remove the duplicate elements
    if (value !== undefined && value !== null) {
      return _.uniqBy(value, 'name');
    }
    return value;
  }

}
