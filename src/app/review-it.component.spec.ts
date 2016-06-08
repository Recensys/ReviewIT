import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { ReviewITAppComponent } from '../app/review-it.component';

beforeEachProviders(() => [ReviewITAppComponent]);

describe('App: ReviewIT', () => {
  it('should create the app',
      inject([ReviewITAppComponent], (app: ReviewITAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'review-it works!\'',
      inject([ReviewITAppComponent], (app: ReviewITAppComponent) => {
    expect(app.title).toEqual('review-it works!');
  }));
});
