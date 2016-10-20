import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Album } from './album.model';

@Component({
  selector: 'edit-album',
  template: `
  <div class='col-sm-6' *ngIf="albumToEdit && childIsOwner">
    <div class='well'>
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
      <div class='form-group'>
        <label>Image Link:</label>
        <input [(ngModel)]="albumToEdit.image" class='form-control'>
      </div>
      <button (click)="doneClicked()" class='btn pull-right'>Save</button>
    </div>
  </div>
   `

})

export class EditAlbumComponent {
  @Input() albumToEdit: Album;
  @Input() childIsOwner: boolean;
  @Output() doneClickedSender = new EventEmitter();
  doneClicked() {
    this.doneClickedSender.emit();

  }
}
