import {Pipe, PipeTransform} from '@angular/core';
import {Album} from './album.model';

@Pipe({
  name: "genre",
  pure: false
})

export class GenrePipe implements PipeTransform {
  transform(input: Album[], genre) {
    var output: Album[] = [];
    if (genre === 'all') {
      return input;
    } else {
      for(var i = 0; i < input.length; i++) {
        if(input[i].genre === genre) {
          output.push(input[i]);
        }
      }
      return output;
    }
  }
}
