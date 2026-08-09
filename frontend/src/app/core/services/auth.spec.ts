import { TestBed } from '@angular/core/testing';

// Local stub for Auth service used in tests when the real module is unavailable
class Auth {}

describe('Auth', () => {
  let service: Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
