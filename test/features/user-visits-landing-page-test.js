const {assert} = require('chai');

describe('User hits main page ->', () => {
  describe('with no videos added yet ->', () => {
    it('page has no items', () => {
      browser.url('/');
      assert.equal(browser.getText('#videos-container'), '')
    });
  });

  describe('can navigate ->', () => {
    it('to videos/create', () => {
      browser.url('/');
      const title = 'Save a Video';

      browser.click('a[href="/create.html"]')
      assert.include(browser.getText('body'), title);

    });
  });
});

/* Test that users can navigate to videos/create.html from the landing page and view a page that contains the text "Save a video".

Write the minimum code to pass this test.

Once passing, refactor the code for the create page to use correct HTML. Make sure to copy the head section from the index.html page to keep the style consistent. */