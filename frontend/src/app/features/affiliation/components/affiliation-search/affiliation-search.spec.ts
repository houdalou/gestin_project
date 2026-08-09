import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliationSearch } from './affiliation-search';

describe('AffiliationSearch', () => {
  let component: AffiliationSearch;
  let fixture: ComponentFixture<AffiliationSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffiliationSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(AffiliationSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
