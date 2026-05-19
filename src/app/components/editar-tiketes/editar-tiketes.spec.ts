import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTiketes } from './editar-tiketes';

describe('EditarTiketes', () => {
  let component: EditarTiketes;
  let fixture: ComponentFixture<EditarTiketes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarTiketes],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarTiketes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
