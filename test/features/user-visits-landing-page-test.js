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
