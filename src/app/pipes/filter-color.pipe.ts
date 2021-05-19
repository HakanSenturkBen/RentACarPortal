import { Pipe, PipeTransform } from '@angular/core';
import { ColorModel } from '../components/colors/colors';

@Pipe({
  name: 'filterColor'
})
export class FilterColorPipe implements PipeTransform {

  transform(value: ColorModel[], filterText:string):ColorModel[] {
    filterText=filterText?filterText.toLocaleLowerCase():""
    return filterText?value.filter((c:ColorModel)=>c.colorName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
