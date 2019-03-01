import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { Classification } from '../models/classification.model';
import { ArtService } from '../services/art.service';
import { Culture } from '../models/culture.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  classifications: Array<Classification> = new Array<Classification>();
  cultures: Array<Culture> = new Array<Culture>();
  pageNumber: number = 1;

  constructor(private _filterForm: MatDialog, private _artService: ArtService) {
    this._artService.getClassifications(this.pageNumber).subscribe(res => {
      this.classifications = res.map(classification => classification.name);
    });
    this._artService.getCultures(this.pageNumber).subscribe(res => {
      this.cultures = res.map(culture => culture.name)
    })
   }

  openFilterDialog(){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {classifications: this.classifications, cultures: this.cultures}
    this._filterForm.open(FilterFormComponent);
  }

  ngOnInit() {
  }

}
