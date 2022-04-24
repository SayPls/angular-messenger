import { Pipe, PipeTransform } from '@angular/core';
import {Chat} from "../../core/model/chat";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(data: Chat[], filterValue: string): Chat[] {
    return data.filter(d => d.author.displayName.toLocaleLowerCase().includes(filterValue));
  }

}
