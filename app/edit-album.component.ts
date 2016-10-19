import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Album } from './album.model';

@Component({
  selector: 'edit-album',
  template: `
  <div *ngIf="albumToEdit">
    <h2>Edit Album</h2>
    <div class='form-group'>
      <label>Album Name:</label>
      <input [(ngModel)]="albumToEdit.name" class='form-control'>
    </div>
    <div class='form-group'>
      <label>Artist:</label>
      <input [(ngModel)]="albumToEdit.artist" class='form-control'>
    </div>
    <div class='form-group'>
      <label>Price:</label>
      <input [(ngModel)]="albumToEdit.price" class='form-control'>
    </div>
    <div class='form-group'>
      <label>Genre:</label>
      <input [(ngModel)]="albumToEdit.genre" class='form-control'>
    </div>
    <button (click)="doneClicked()" class='btn'>Done...</button>
  </div>
   `

})

export class EditAlbumComponent {
  @Input() albumToEdit: Album;
  @Output() doneClickedSender = new EventEmitter();
  doneClicked() {
    this.doneClickedSender.emit();
  }
}
