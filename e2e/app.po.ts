export class ReviewITPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('review-it-app h1')).getText();
  }
}
