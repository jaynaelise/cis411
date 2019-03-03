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

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent implements OnInit {

  cultures: Array<Culture> = new Array<Culture>();
  classifications: Array<Classification> = new Array<Classification>();
  periods: Array<Period> = new Array<Period>();
  searchForm: FormGroup;
  culturePageNumber: number = 1; //start at 2 because we'll already have the first page of cultures 
  classificationPageNumber: number = 1; //and classifications when this component loads
  periodPageNumber: number = 1;
  testResults: Array<Art> = new Array<Art>();

  constructor(@Inject(MAT_DIALOG_DATA) private data, filterDialogRef: MatDialogRef<FilterFormComponent>,
    private _formBuilder: FormBuilder, private _artService: ArtService, private _router: Router) {

    this.searchForm = this._formBuilder.group({
      cultureName: [, Validators.compose([Validators.required])],
      classificationName: [, Validators.compose([Validators.required])]
    });

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

  ngOnInit() {
  }

  getCultures() {
    this._artService.getCultures(this.culturePageNumber).subscribe(res => {
      let culturesResult: Culture[] = res.records.map(x => x.name);
      this.cultures = this.cultures.concat(culturesResult);
      this.culturePageNumber++;
    });
  }

  getClassifications() {
    this._artService.getClassifications(this.classificationPageNumber).subscribe(res => {
      let classificationsResult: Classification[] = res.records.map(x => x.name);
      this.classifications = this.classifications.concat(classificationsResult);
      this.classificationPageNumber++;
    });
  }

  getPeriods() {
    this._artService.getPeriods(this.periodPageNumber).subscribe(res => {
      let periodsResult: Period[] = res.records.map(x => x.name);
      this.periods = this.periods.concat(periodsResult);
    });
  }

  searchArt(culture: string, period: string, classification: string) {
    let searchCriteria = <SearchCriteria>{
      Culture: culture,
      Period: period,
      Classification: classification
    };
    this._artService.getArtByClassificationCulture(searchCriteria, 1)
      .subscribe(res => {
        this.testResults = res.records
          .map(x => <Art>{
            Title: x.title,
            ArtistName: x.people[0].name,
            Year: x.dated,
            Description: x.description,
            Culture: x.culture,
            Period: x.period,
            ImageLink: x.primaryimageurl,
            ObjectNumber: x.objectnumber
          });
      });

    // this._artService.SearchCriteria.next(searchCriteria);
    // this._router.navigate()
  }

}
