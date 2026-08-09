import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliationTableComponent } from './affiliation-table';

describe('AffiliationTableComponent', () => {

  let component: AffiliationTableComponent;
  let fixture: ComponentFixture<AffiliationTableComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [AffiliationTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AffiliationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});