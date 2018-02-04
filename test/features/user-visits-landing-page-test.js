const {assert} = require('chai');

const { parseTextFromHTML, seedItemToDatabase, buildItemObject } = require('../test-helper-funcs');

describe('User hits main page ->', () => {
  describe('with no videos added yet ->', () => {
    it('page has no items', () => {
      browser.url('/videos');
      assert.equal(browser.getText('#videos-container'), '')
    });
  });

  describe('with existing videos ->', () => {
    it('page shows iframe',  () => {
      browser.url('/videos/create');
      const newVideo = buildItemObject();

      browser.setValue('#title-input', newVideo.title);
      browser.setValue('#description-input', newVideo.description);
      browser.setValue('#url-input', newVideo.url);

      browser.url('/');

      assert.include(browser.getText('body'), 'iframe');

    });
  });

  describe('can navigate ->', () => {
    it('to videos/create', () => {
      browser.url('/videos');

      // browser.click('a[href="/videos/create]') -> not wokring :/
      browser.click('a')
      assert.include(browser.getText('body'), 'Add Video');

    });
  });
});
