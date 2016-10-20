import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Album } from './album.model';
import { GenrePipe } from './genre.pipe';
import { UniqueGenrePipe } from './unique-genre.pipe';
import { SearchPipe } from './search.pipe';

@Component({
  selector: 'album-list',
  template: `
  <div class="nav well">
    <h1 class='pull-left'>Angular 2 Music Store</h1>
    <div class="pull-right form-inline">
      <label>Genre:</label>
      <select id="genreSearch" (change)="onChange($event.target.value)" class='form-control'>
        <option value='all'>All</option>
        <option *ngFor="let genre of childAlbumList | uniqueGenre" value='{{genre}}'>{{ genre }}</option>
      </select>
    </div>
    <div class="pull-right form-inline">
      <label>Artist:</label>
      <input id="artistSearch" (keyup)="onSearch($event.target.value)" class='form-control' placeholder="Search by Artist">
    </div>
  </div>
  <br>
  <div class='row'>
    <div class='albumDisplay col-sm-3' *ngFor="let album of childAlbumList | genre:genreDisplay | search:searchTerm">
      <div class='well'>
        <img src='/resources/images/{{album.image}}' class='img-responsive'>
        <h4>{{album.name}}</h4>
        <p>{{album.artist}}</p>
        <p>{{album.genre}}</p>
        <p>\${{album.price}}</p>
        <button *ngIf="childIsOwner" (click)="editClicked(album)" class='btn'>Edit</button>
        <button (click)="buyClicked(album)" class='btn'>Add to Cart</button>
      </div>
    </div>
  </div>
  `
})

export class AlbumListComponent {
  @Input() childAlbumList: Album[];
  @Input() childIsOwner: boolean;
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
