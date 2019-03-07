import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenSearchComponent } from './opensearch.component';

describe('OpenSearchComponent', () => {
  let component: OpenSearchComponent;
  let fixture: ComponentFixture<OpenSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
