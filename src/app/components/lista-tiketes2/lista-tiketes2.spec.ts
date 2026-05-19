import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTiketes2 } from './lista-tiketes2';

describe('ListaTiketes2', () => {
  let component: ListaTiketes2;
  let fixture: ComponentFixture<ListaTiketes2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTiketes2],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaTiketes2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
