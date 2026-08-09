import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviModification } from './suivi-modification';

describe('SuiviModification', () => {
  let component: SuiviModification;
  let fixture: ComponentFixture<SuiviModification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiviModification],
    }).compileComponents();

    fixture = TestBed.createComponent(SuiviModification);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
