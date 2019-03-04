import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Culture } from 'src/app/models/culture.model';
import { Classification } from 'src/app/models/classification.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArtService } from 'src/app/services/art.service';
import { Router } from '@angular/router';
import { Period } from 'src/app/models/period.model';
import { SearchCriteria } from 'src/app/models/search-criteria.model';
import { Art } from 'src/app/models/art.model';
import { Medium } from 'src/app/models/medium.model';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent implements OnInit {

  cultures: Array<Culture> = new Array<Culture>();
  classifications: Array<Classification> = new Array<Classification>();
  periods: Array<Period> = new Array<Period>();
  mediums: Array<Medium> = new Array<Medium>();
  searchForm: FormGroup;
  culturePageNumber: number = 1; 
  classificationPageNumber: number = 1;
  periodPageNumber: number = 1;
  testResults: Array<Art> = new Array<Art>();

  constructor(@Inject(MAT_DIALOG_DATA) private data, filterDialogRef: MatDialogRef<FilterFormComponent>,
    private _formBuilder: FormBuilder, private _artService: ArtService, private _router: Router) {

    this.searchForm = this._formBuilder.group({
      cultureName: [, Validators.compose([Validators.required])],
      classificationName: [, Validators.compose([Validators.required])]
    });

    this.getCultures();
    this.getClassifications();
    this.getPeriods();
    this.getMediums()
  }

  ngOnInit() {
  }

  getCultures() {
    this._artService.getCultures(this.culturePageNumber).subscribe(res => {
      this.cultures = res.records.map(culture => <Culture>{ Name: culture.name });
      this.cultures.sort((x, y) => {
        if(x.Name.toLocaleLowerCase().substring(0,1) > y.Name.toLocaleLowerCase().substring(0,1)){
          return 1;
        }
        else{
          return -1
        }
      });
    });
  }

  getClassifications() {
    this._artService.getClassifications(this.classificationPageNumber).subscribe(res => {
      this.classifications = res.records.map(classification => <Classification>{ Name: classification.name });
      this.classifications.sort((x, y) => {
        if(x.Name.toLocaleLowerCase().substring(0,1) > y.Name.toLocaleLowerCase().substring(0,1)){
          return 1;
        }
        else{
          return -1
        }
      });
    });
  }

  getPeriods() {
    this._artService.getPeriods(this.periodPageNumber).subscribe(res => {
      this.periods = res.records.map(period => <Period>{ Name: period.name });
      this.periods.sort((x, y) => {
        if(x.Name.toLocaleLowerCase().substring(0,1) > y.Name.toLocaleLowerCase().substring(0,1)){
          return 1;
        }
        else{
          return -1
        }
      });
    });  
  }

  getMediums(){
    this._artService.getMediums(this.periodPageNumber).subscribe(res => {
      this.mediums = res.records.map(medium => <Medium>{ Name: medium.name, ObjectCount: medium.objectcount });
      this.mediums.sort((x, y) =>{
        if(x.ObjectCount > y.ObjectCount){
          return -1;
        }
        else{
          return 1;
        }
      });
    });
  }

  searchArt(culture: string, period: string, classification: string) {
    let searchCriteria = <SearchCriteria>{
      Culture: culture,
      Period: period,
      Classification: classification
    };
    // this._artService.SearchCriteria.next(searchCriteria);
    // this._router.navigate()
  }

}
