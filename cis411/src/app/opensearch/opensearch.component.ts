import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { Century } from '../models/century.model';
import { ArtService } from '../services/art.service';
import { Culture } from '../models/culture.model';
import { Period } from '../models/period.model';

@Component({
  selector: 'app-opensearch',
  templateUrl: './opensearch.component.html',
  styleUrls: ['./opensearch.component.scss']
})
export class OpenSearchComponent implements OnInit {

  centuries: Array<Century> = new Array<Century>();
  cultures: Array<Culture> = new Array<Culture>();
  periods: Array<Period> = new Array<Period>();
  pageNumber: number = 1;

  constructor(private _filterForm: MatDialog, private _artService: ArtService) {
   }

  openFilterDialog(){
    this._filterForm.open(FilterFormComponent);
  }

  ngOnInit() {
  }

}
