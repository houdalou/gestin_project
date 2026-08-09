import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAffiliation } from './new-affiliation';

describe('NewAffiliation', () => {
  let component: NewAffiliation;
  let fixture: ComponentFixture<NewAffiliation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAffiliation],
    }).compileComponents();

    fixture = TestBed.createComponent(NewAffiliation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
