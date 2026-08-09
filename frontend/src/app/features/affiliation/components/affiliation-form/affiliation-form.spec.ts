import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliationFormComponent } from './affiliation-form';

describe('AffiliationForm', () => {
  let component: AffiliationFormComponent;
  let fixture: ComponentFixture<AffiliationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffiliationFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AffiliationFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
