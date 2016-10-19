import {Pipe, PipeTransform} from '@angular/core';
import {Album} from './album.model';

@Pipe({
  name: "search",
  pure: false
})

export class SearchPipe implements PipeTransform {
  transform(input: Album[], searchTerm) {
    var output: Album[] = [];
      for(var i = 0; i < input.length; i++) {
      var search = searchTerm.toLowerCase();
      var artist = input[i].artist.toLowerCase();
        if(artist.indexOf(search) >= 0) {
          output.push(input[i]);
        }
      }
      return output;
    }
}
