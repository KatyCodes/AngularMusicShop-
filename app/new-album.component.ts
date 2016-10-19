import { Component, Output, EventEmitter } from '@angular/core';
import { Album } from './album.model';

@Component({
  selector: 'new-album',
  template: `
    <h2>Add an Album</h2>
    <div class='form-group'>
      <label>Album Name:</label>
      <input #name class='form-control'>
    </div>
    <div class='form-group'>
      <label>Artist:</label>
      <input #artist class='form-control'>
    </div>
    <div class='form-group'>
      <label>Price:</label>
      <input #price class='form-control'>
    </div>
    <div class='form-group'>
      <label>Genre:</label>
      <input #genre class='form-control'>
    </div>
    <button (click)="addAlbumClicked(name.value, artist.value, price.value, genre.value);
      name.value='';
      artist.value='';
      price.value='';
      genre.value='';
    " class='btn'>Add</button>
  `
})

export class NewAlbumComponent {
  @Output() newAlbumSender = new EventEmitter();
  addAlbumClicked(name: string, artist: string, price: string, genre: string){
    var floatPrice = parseFloat(price);
    var newAlbum = new Album(name, artist, floatPrice, genre);
    this.newAlbumSender.emit(newAlbum);
  }

}
