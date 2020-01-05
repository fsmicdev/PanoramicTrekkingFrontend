import {TestBed} from '@angular/core/testing';

import {TwitterService} from './twitter.service';

describe('TwitterServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TwitterService = TestBed.get(TwitterService);
    expect(service).toBeTruthy();
  });
});
