import { Pipe, PipeTransform } from '@angular/core';
import { CarInfoModel } from '../components/car/carInfoModel';


@Pipe({
  name: 'filterColor'
})
export class FilterColorPipe implements PipeTransform {

  transform(value: CarInfoModel[], filterText:string):CarInfoModel[] {
    filterText=filterText?filterText.toLocaleLowerCase():""
    return filterText?value.filter((c:CarInfoModel)=>c.colorName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
