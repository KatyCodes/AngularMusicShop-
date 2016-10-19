import {Pipe, PipeTransform} from '@angular/core';
import {Album} from './album.model';

@Pipe({
  name: "uniqueGenre",
  pure: false
})

export class UniqueGenrePipe implements PipeTransform {
  transform(input: Album[]) {
    var output: string[] = [];
    for(var i = 0; i < input.length; i++) {
      if (output.indexOf(input[i].genre) === -1) {
        output.push(input[i].genre);
      }
    }
    return output;
  }
}
