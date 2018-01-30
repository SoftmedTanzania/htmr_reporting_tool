import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'collectionFilter'
})
export class CollectionFilterPipe implements PipeTransform {

  transform(value: any, searchText?: any, filedName?: any): any {
    const newCollection = [];
    if (searchText !== undefined) {
      if (filedName !== undefined) {
        value.forEach((valueItem, valueItemIndex) => {
          if (valueItem[filedName].toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
            newCollection.push(valueItem);
          }
        });
        return newCollection;
      }
    }

    return value;
  }


}
