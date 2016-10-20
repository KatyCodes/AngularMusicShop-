import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Album } from './album.model';
import { UniqueGenrePipe } from './unique-genre.pipe';

@Component({
  selector: 'navigation',
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
  `
})

export class NavComponent {
  @Input() childAlbumList: Album[];
  @Output() genreDisplaySender = new EventEmitter();
  @Output() searchTermSender = new EventEmitter();

  onChange(newGenre) {
    this.genreDisplaySender.emit(newGenre);
  }

  onSearch(search) {
    this.searchTermSender.emit(search);
  }
}
