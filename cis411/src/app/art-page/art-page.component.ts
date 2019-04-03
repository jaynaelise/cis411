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


  getArt() {
    this.artPieces[0]
    this._artService.getArtByMediumCenturyCulture(this.searchCriteria, this.pageNumber)
      .subscribe(res => {
        this.artPieces = res.records.map(piece => <Art>{ ObjectUrl: piece.url });

        for (let i = 0; i < this.artPieces.length; i++) {
          let objectId = this.artPieces[i].ObjectUrl.substring(this.artPieces[i].ObjectUrl.lastIndexOf('/'), this.artPieces[i].ObjectUrl.length);
          this._artService.getArtByObjectId(objectId).subscribe(result => {
            if (result.primaryimageurl) {
              this.artPieces[i].Title = result.title;
              this.artPieces[i].Description = result.description;
              this.artPieces[i].Culture = this.searchCriteria.Culture;
              this.artPieces[i].Year = result.accessionyear;
              this.artPieces[i].ImageLink = result.primaryimageurl;
              this.artPieces[i].Century = this.searchCriteria.Century;
              this.artPieces[i].Medium = this.searchCriteria.Medium;
            }
          });
        }
      });
  }
}
