import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTiketes } from './lista-tiketes';

describe('ListaTiketes', () => {
  let component: ListaTiketes;
  let fixture: ComponentFixture<ListaTiketes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTiketes],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaTiketes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
