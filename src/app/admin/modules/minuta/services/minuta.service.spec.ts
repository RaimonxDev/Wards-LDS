import { TestBed } from '@angular/core/testing';

import { MinutaService } from './minuta.service';

describe('MinutaService', () => {
  let service: MinutaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinutaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
