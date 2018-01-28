const {assert} = require('chai');

describe('User hits main page ->', () => {
  describe('with no videos added yet ->', () => {
    it('page has no items', () => {
      browser.url('/');
      assert.equal(browser.getText('#videos-container'), '')
    })
  })
})
