import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tikete } from './tikete';

describe('Tikete', () => {
  let component: Tikete;
  let fixture: ComponentFixture<Tikete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tikete],
    }).compileComponents();

    fixture = TestBed.createComponent(Tikete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
