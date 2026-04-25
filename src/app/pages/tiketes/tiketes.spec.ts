import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tiketes } from './tiketes';

describe('Tiketes', () => {
  let component: Tiketes;
  let fixture: ComponentFixture<Tiketes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tiketes],
    }).compileComponents();

    fixture = TestBed.createComponent(Tiketes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
