import { Pipe, PipeTransform } from '@angular/core';
import { CarDetailComponent } from '../components/car-detail/car-detail.component';
import { CarInfoModel } from '../components/car/carInfoModel';

@Pipe({
  name: 'filterCar'
})
export class FilterCarPipe implements PipeTransform {

  transform(value: CarInfoModel[], filterText:string): CarInfoModel[] {
      filterText=filterText?filterText.toLocaleLowerCase():""
      return filterText?value.filter((c:CarInfoModel)=>c.brandName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
    }
}
