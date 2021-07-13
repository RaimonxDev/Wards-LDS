import { TestBed } from '@angular/core/testing';

import { InterceptorsTokenService } from './token.service';

describe('TokenService', () => {
  let service: InterceptorsTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptorsTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
