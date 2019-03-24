import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Culture } from 'src/app/models/culture.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArtService } from 'src/app/services/art.service';
import { Router } from '@angular/router';
import { Period } from 'src/app/models/period.model';
import { SearchCriteria } from 'src/app/models/search-criteria.model';
import { Art } from 'src/app/models/art.model';
import { Medium } from 'src/app/models/medium.model';
import { Century } from 'src/app/models/century.model';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent implements OnInit {

  cultures: Array<Culture> = new Array<Culture>();
  centuries: Array<Century> = new Array<Century>();
  periods: Array<Period> = new Array<Period>();
  mediums: Array<Medium> = new Array<Medium>();
  searchForm: FormGroup;
  culturePageNumber: number = 1; 
  classificationPageNumber: number = 1;
  periodPageNumber: number = 1;
  testResults: Array<Art> = new Array<Art>();
  searchCriteria: SearchCriteria;

  constructor(@Inject(MAT_DIALOG_DATA) private data, filterDialogRef: MatDialogRef<FilterFormComponent>,
    private _formBuilder: FormBuilder, private _artService: ArtService, private _router: Router) {

    this.searchForm = this._formBuilder.group({
      cultureName: [, Validators.compose([Validators.required])],
      classificationName: [, Validators.compose([Validators.required])]
    });

    this.getCultures();
    this.getMediums();
    this.getCenturies();
  }

  ngOnInit() {
  }

  getCultures() {
    this._artService.getCultures(this.culturePageNumber).subscribe(res => {
      this.cultures = res.records
      .map(culture => <Culture>{ Name: culture.name, ObjectCount: culture.objectcount })
      .sort((x, y) => {
        if(x.ObjectCount > y.ObjectCount){
          return -1;
        }
        else{
          return 1;
        }})
      .slice(0, 10);
    });
  }

  getCenturies(){
    this._artService.getCentury().subscribe(res => {
      this.centuries = res.records.map(century => <Century>{ Name: century.name, ObjectCount: century.objectcount})
      .sort((x, y) => {
        if(x.ObjectCount > y.ObjectCount){
          return -1;
        }
        else{
          return 1;
        }
      })
      .slice(0, 10);
    });
  }

  getMediums(){
    this._artService.getMediums(this.periodPageNumber).subscribe(res => {
      this.mediums = res.records.map(medium => <Medium>{ Name: medium.name, ObjectCount: medium.objectcount })
      .sort((x, y) => {
        if(x.ObjectCount > y.ObjectCount){
          return -1;
        }
        else{
          return 1;
        }
      })
      .slice(0, 10);
    });
  }

  searchArt(culture: string, century: string, medium: string) {
    this.searchCriteria = <SearchCriteria>{
      Medium: culture,
      Culture: culture,
      Century: century
    };
    // this._artService.SearchCriteria.next(searchCriteria);
    // this._router.navigate()
  }

}
