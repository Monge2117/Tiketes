import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTiketes2 } from './create-tiketes2';

describe('CreateTiketes2', () => {
  let component: CreateTiketes2;
  let fixture: ComponentFixture<CreateTiketes2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTiketes2],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTiketes2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
