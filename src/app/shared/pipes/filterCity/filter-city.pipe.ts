import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCity'
})
export class FilterCityPipe implements PipeTransform {

  transform(arr: Array<any>, value: string): any {
    if (!value) {
      return arr
    } else {
      if(arr){
        return arr.filter((elem: any) => {
          return elem.Description.includes(value)
        })
      }  
    }
  }
}
