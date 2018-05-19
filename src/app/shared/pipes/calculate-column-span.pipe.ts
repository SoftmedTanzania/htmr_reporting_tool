import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateColumnSpan'
})
export class CalculateColumnSpanPipe implements PipeTransform {

  transform(value: any, categories): any {
    if (value) {
      if ( categories.length === value ) {
        return 1;
      } else if (categories.length === (value + 1)) {
        return categories[value].items.length;
      }else if (categories.length === (value + 2)) {
        return categories[value].items.length * categories[value + 1].items.length;
      }else {
        return 1;
      }
    }
  }

}
