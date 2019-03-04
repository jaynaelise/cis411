import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { Classification } from '../models/classification.model';
import { ArtService } from '../services/art.service';
import { Culture } from '../models/culture.model';
import { Period } from '../models/period.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  classifications: Array<Classification> = new Array<Classification>();
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
