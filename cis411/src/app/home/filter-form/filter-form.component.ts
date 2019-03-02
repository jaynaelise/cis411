import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Culture } from 'src/app/models/culture.model';
import { Classification } from 'src/app/models/classification.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArtService } from 'src/app/services/art.service';
import { Router } from '@angular/router';
import { Period } from 'src/app/models/period.model';
import { SearchCriteria } from 'src/app/models/search-criteria.model';

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
  culturePageNumber: number = 2; //start at 2 because we'll already have the first page of cultures 
  classificationPageNumber: number = 2; //and classifications when this component loads
  periodPageNumber: number = 2;

  constructor(@Inject(MAT_DIALOG_DATA) private data, filterDialogRef: MatDialogRef<FilterFormComponent>,
    private _formBuilder: FormBuilder, private _artService: ArtService, private _router: Router) {

    this.searchForm = this._formBuilder.group({
      cultureName: [, Validators.compose([Validators.required])],
      classificationName: [, Validators.compose([Validators.required])]
    });

    this.cultures = data.cultures;
    this.classifications = data.classifications;
    this.periods = data.periods;
  }

  ngOnInit() {
  }

  getCultures(){
    this._artService.getCultures(this.culturePageNumber).subscribe(res => {
      let culturesResult: Culture[] = res.map(x => x.name);
      this.cultures = this.cultures.concat(culturesResult);
      this.culturePageNumber++;
    });
  }

  getClassifications(){
    this._artService.getClassifications(this.classificationPageNumber).subscribe(res => {
      let classificationsResult: Classification[] = res.map(x => x.name);
      this.classifications = this.classifications.concat(classificationsResult);
      this.classificationPageNumber++;
    });
  }

  getPeriods(){
    this._artService.getPeriods(this.periodPageNumber).subscribe(res => {
      let periodsResult: Period[] = res.map(x => x.name);
      this.periods = this.periods.concat(periodsResult);
    });
  }

  searchArt(culture: string, period: string, classification: string){
    let searchCriteria = <SearchCriteria>{
      Culture: culture,
      Period: period,
      Classification: classification
    };
    this._artService.searchCriteria.next(searchCriteria);
    // this._router.navigate()
  }

}
