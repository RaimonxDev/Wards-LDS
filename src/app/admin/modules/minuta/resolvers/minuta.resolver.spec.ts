import { TestBed } from '@angular/core/testing';

import { MinutaResolver } from './minuta.resolver';

describe('MinutaResolver', () => {
  let resolver: MinutaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MinutaResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
