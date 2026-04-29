import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTikete } from './create-tikete';

describe('CreateTikete', () => {
  let component: CreateTikete;
  let fixture: ComponentFixture<CreateTikete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTikete],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTikete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
