import { Component, Output, EventEmitter } from '@angular/core';
import { Album } from './album.model';

@Component({
  selector: 'new-album',
  template: `
  <div class='col-sm-6'>
    <div class='well'>
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
      <div class='form-group'>
        <label>Image Link:</label>
        <input #image class='form-control'>
      </div>
      <button class='btn pull-right' (click)="addAlbumClicked(name.value, artist.value, price.value, genre.value, image.value);
        name.value='';
        artist.value='';
        price.value='';
        genre.value='';
        image.value='';
      ">Add</button>
    </div>
  </div>
  `
})

export class NewAlbumComponent {
  @Output() newAlbumSender = new EventEmitter();
  addAlbumClicked(name: string, artist: string, price: string, genre: string, image: string){
    var floatPrice = parseFloat(price);
    var newAlbum = new Album(name, artist, floatPrice, genre, image);
    this.newAlbumSender.emit(newAlbum);
  }

}
