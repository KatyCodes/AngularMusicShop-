import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Album } from './album.model';
import { GenrePipe } from './genre.pipe';

@Component({
  selector: 'album-list',
  template: `
  <div>
    <label>Sort by Genre:</label>
    <select (change)=onChange($event.target.value) class='form-control'>
      <option value='all'>All Genres</option>
      <option *ngFor="let genre of childGenreList" value='{{genre}}'>{{ genre }}</option>
    </select>
  </div>
  <div *ngFor="let album of childAlbumList | genre:genreDisplay">
    <h3>{{album.name}}</h3>
    <h4>{{album.artist}}</h4>
    <h4>{{album.genre}}</h4>
    <h4>\${{album.price}}</h4>
    <button (click)="editClicked(album)" class='btn'>Edit</button>
  </div>
  `
})

export class AlbumListComponent {
  @Input() childAlbumList: Album[];
  @Input() childGenreList: string[];
  @Output() albumEditSender = new EventEmitter();

  public genreDisplay: string = "all";

  editClicked(albumToEdit){
    this.albumEditSender.emit(albumToEdit);
  };

  onChange(newGenre) {
    this.genreDisplay = newGenre;
  }

}
