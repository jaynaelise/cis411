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
  searchCriteria: SearchCriteria = new SearchCriteria();
  mediumSelection: Array<boolean> = new Array<boolean>();
  cultureSelection: Array<boolean> = new Array<boolean>();
  centurySelection: Array<boolean> = new Array<boolean>();


  constructor(@Inject(MAT_DIALOG_DATA) private data, private _filterDialogRef: MatDialogRef<FilterFormComponent>,
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
      this.cultures = res.records.map(culture => <Culture>{ Name: culture.name, ObjectCount: culture.objectcount })
      .sort((x, y) => {
        if(x.ObjectCount > y.ObjectCount){
          return -1;
        }
        else{
          return 1;
        }})
      .slice(0, 10);

      let cultureIndex = 0;
      this.cultures.forEach(culture => {
        this.cultureSelection[cultureIndex] = false;
        cultureIndex++;
      });
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

    let centuryIndex = 0;
    this.centuries.forEach(century => {
      this.centurySelection[centuryIndex] = false;
      centuryIndex++;
    })
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

      let mediumIndex = 0;
      this.mediums.forEach(medium => {
        this.mediumSelection[mediumIndex] = false;
        mediumIndex++;
      });
    });
  }

  toggleMediumSelect(index: number){
    for(let i = 0; i < this.mediumSelection.length; i++){
      this.mediumSelection[i] = false;
    }
    this.mediumSelection[index] = !this.mediumSelection[index];
    this.searchCriteria.Medium = this.mediums[index].Name;
  }

  toggleCultureSelect(index: number){
    for(let i = 0; i < this.cultureSelection.length; i++){
      this.cultureSelection[i] = false;
    }
    this.cultureSelection[index] = !this.cultureSelection[index];
    this.searchCriteria.Culture = this.cultures[index].Name;
  }

  toggleCenturySelect(index: number){
    for(let i = 0; i < this.centurySelection.length; i++){
      this.centurySelection[i] = false;
    }
    this.centurySelection[index] = !this.centurySelection[index];
    this.searchCriteria.Century = this.centuries[index].Name;
  }

  searchArt() {
    this._artService.searchCriteria.next(this.searchCriteria);
    this._router.navigateByUrl("/results");
    this._filterDialogRef.close();
  }

}
