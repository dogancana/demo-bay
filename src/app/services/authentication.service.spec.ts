import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService (isolated)', () => {
  let service: AuthenticationService;
  let postSpy: jest.SpyInstance;

  beforeEach(() => {
    postSpy = jest.fn();
    service = new AuthenticationService('', { post: postSpy } as any);
  });

  it('should create', () => {
    expect(service).toBeDefined();
  });
});
