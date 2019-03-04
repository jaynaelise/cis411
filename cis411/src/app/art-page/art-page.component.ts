import { Component, OnInit } from '@angular/core';
import { ArtService } from '../services/art.service';
import { Art } from '../app.component';
import { SearchCriteria } from '../models/search-criteria.model';

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
    })
  }

  ngOnInit() {
  }


  getArt(){
    this._artService.getArtByClassificationCulture(this.searchCriteria, this.pageNumber).subscribe(res => {
    });
  }
}
