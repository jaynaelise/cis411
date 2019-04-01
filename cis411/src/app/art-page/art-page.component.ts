import { Component, OnInit } from '@angular/core';
import { ArtService } from '../services/art.service';
import { SearchCriteria } from '../models/search-criteria.model';
import { Art } from '../models/art.model';

@Component({
  selector: 'app-art-page',
  templateUrl: './art-page.component.html',
  styleUrls: ['./art-page.component.scss']
})
export class ArtPageComponent implements OnInit {

  artPieces: Array<Art> = new Array<Art>();
  searchCriteria: SearchCriteria;
  pageNumber: number = 1;

  constructor(private _artService: ArtService) { 
    this._artService.searchCriteria.subscribe(res => {
      this.searchCriteria = res;
      this.getArt();
    });
  }

  ngOnInit() {
  }


  getArt(){
    this.artPieces[0]
    this._artService.getArtByMediumCenturyCulture(this.searchCriteria, this.pageNumber).subscribe(res => {
      this.artPieces = res.records.map(piece => <Art>{ObjectUrl: piece.url});
      this.artPieces.forEach(artPiece => {
        this._artService.getArtByObjectUrl(artPiece.ObjectUrl).subscribe(result => {
          artPiece.Title = result.title;
          artPiece.Description = result.description;
          artPiece.Culture = this.searchCriteria.Culture;
          artPiece.Year = result.accessionyear;
          artPiece.ImageLink = result.primaryimageurl;
          artPiece.Century = this.searchCriteria.Century;
          artPiece.Medium = this.searchCriteria.Medium;
        });
      });
    });
  }
}
