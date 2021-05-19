import { Pipe, PipeTransform } from '@angular/core';
import { BrandModel } from '../components/brand/brandModel';

@Pipe({
  name: 'filterBrand'
})
export class FilterBrandPipe implements PipeTransform {

  transform(value: BrandModel[], filterText:string):BrandModel[] {
    filterText=filterText?filterText.toLocaleLowerCase():""
    return filterText?value.filter((c:BrandModel)=>c.brandName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
