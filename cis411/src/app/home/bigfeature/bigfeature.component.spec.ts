import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigfeatureComponent } from './bigfeature.component';
import { OpenSearchComponent } from '../opensearch/opensearch.component';

describe('BigfeatureComponent', () => {
  let component: BigfeatureComponent;
  let fixture: ComponentFixture<BigfeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigfeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigfeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
