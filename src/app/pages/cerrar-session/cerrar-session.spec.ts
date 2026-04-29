import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerrarSession } from './cerrar-session';

describe('CerrarSession', () => {
  let component: CerrarSession;
  let fixture: ComponentFixture<CerrarSession>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CerrarSession],
    }).compileComponents();

    fixture = TestBed.createComponent(CerrarSession);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
