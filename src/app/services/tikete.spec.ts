import { TestBed } from '@angular/core/testing';

import { Tikete } from './tikete';

describe('Tikete', () => {
  let service: Tikete;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tikete);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
