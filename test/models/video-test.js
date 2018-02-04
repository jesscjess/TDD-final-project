const Video = require('../../models/video')
const { assert } = require('chai');
const { mongoose, databaseUrl, options } = require('../../database');
const {connectDatabase, disconnectDatabase} = require('../db-helper-funcs');

describe('Video Model ->', () => {

  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  describe('#Title ->', () => {
    it('is a String', () => {
      const integerTitle = 9;
      const video = new Video({ title: integerTitle });

      assert.strictEqual(video.title, integerTitle.toString());
    })
  });
  describe('#Description ->', () => {
    it('is a String', () => {
      const integerDescription = 9;
      const video = new Video({ description: integerDescription });

      assert.strictEqual(video.description, integerDescription.toString());
    })
  });
});

// module.exports = {
//   connectDatabase,
//   disconnectDatabase,
// }