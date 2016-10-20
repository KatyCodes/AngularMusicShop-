import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Album } from './album.model';
import { GenrePipe } from './genre.pipe';
import { SearchPipe } from './search.pipe';

@Component({
  selector: 'album-list',
  template: `
  <div class='row'>
    <div class='albumDisplay col-sm-3' *ngFor="let album of childAlbumList | genre:childGenreDisplay | search:childSearchTerm">
      <div class='well'>
        <img src='/resources/images/{{album.image}}' class='img-responsive'>
        <h4>{{album.name}}</h4>
        <p>{{album.artist}}</p>
        <p>{{album.genre}}</p>
        <p>\${{album.price}}</p>
        <button *ngIf="childIsOwner" (click)="editClicked(album)" class='btn'>Edit</button>
        <button *ngIf="childIsOwner" (click)="deleteClicked(album)" class='btn'>Delete</button>
        <button *ngIf="!childIsOwner" (click)="buyClicked(album)" class='btn'>Add to Cart</button>
      </div>
    </div>
  </div>
  `
})

export class AlbumListComponent {
  @Input() childAlbumList: Album[];
  @Input() childIsOwner: boolean;
  @Input() childGenreDisplay: string;
  @Input() childSearchTerm: string;
  @Input() childCartTotal: number;
  @Output() albumEditSender = new EventEmitter();
  @Output() albumBuySender = new EventEmitter();
  @Output() albumDeleteSender = new EventEmitter();

  editClicked(albumToEdit){
    this.albumEditSender.emit(albumToEdit);
  };

  buyClicked(album){
    this.albumBuySender.emit(album);
  }

  deleteClicked(album){
    this.albumDeleteSender.emit(album);
  }

}
