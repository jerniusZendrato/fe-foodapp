import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, ...keys: string[]): any[] {
    if (!items || !searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();

    return items.filter(item =>
      keys.some(key => item[key]?.toString().toLowerCase().includes(searchText))
    );
  }
}
