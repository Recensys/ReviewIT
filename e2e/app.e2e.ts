import { ReviewITPage } from './app.po';

describe('review-it App', function() {
  let page: ReviewITPage;

  beforeEach(() => {
    page = new ReviewITPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('review-it works!');
  });
});
