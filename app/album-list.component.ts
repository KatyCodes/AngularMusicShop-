import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Album } from './album.model';
import { GenrePipe } from './genre.pipe';
import { UniqueGenrePipe } from './unique-genre.pipe';
import { SearchPipe } from './search.pipe';

@Component({
  selector: 'album-list',
  template: `

  <input (keyup)="onSearch($event.target.value)" class='form-control' placeholder="Search by Artist">

  <label>Sort by Genre:</label>
  <select (change)="onChange($event.target.value)" class='form-control'>
    <option value='all'>All Genres</option>
    <option *ngFor="let genre of childAlbumList | uniqueGenre" value='{{genre}}'>{{ genre }}</option>
  </select>

  <div *ngFor="let album of childAlbumList | genre:genreDisplay | search:searchTerm">
    <h3>{{album.name}}</h3>
    <h4>{{album.artist}}</h4>
    <h4>{{album.genre}}</h4>
    <h4>\${{album.price}}</h4>
    <button (click)="editClicked(album)" class='btn'>Edit</button>
    <button (click)="buyClicked(album)" class='btn'>Add to Cart</button>
  </div>
  `
})

export class AlbumListComponent {
  @Input() childAlbumList: Album[];
  @Output() albumEditSender = new EventEmitter();
  @Output() albumBuySender = new EventEmitter();
  public genreDisplay: string = "all";
  public searchTerm: string = "";

  editClicked(albumToEdit){
    this.albumEditSender.emit(albumToEdit);
  };

  buyClicked(album){
    this.albumBuySender.emit(album);
  }

  onChange(newGenre) {
    this.genreDisplay = newGenre;
  }

  onSearch(search) {
    this.searchTerm = search;
  }

}
