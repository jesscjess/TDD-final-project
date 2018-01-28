const {assert} = require('chai');

const {buildItemObject} = require('../test-helper-funcs')

describe('User visits create page ->', () => {
  describe('creates new video ->', () => {
    it('sees new video on main page', () => {
      browser.url('/create.html');
      const newItem = buildItemObject()

      browser.setValue('#title-input', newItem.title);
      browser.setValue('#description-input', newItem.description);
      browser.click('#submit-button')

      assert.include(browser.getText('body'), newItem.title);
      assert.include(browser.getText('body'), newItem.description);
      
    });
  });
});