const { assert } = require('chai');
const request = require('supertest');

const app = require('../../app');

const { parseTextFromHTML, seedItemToDatabase } = require('../test-helper-funcs');
const { connectDatabase, disconnectDatabase } = require('../db-helper-funcs');

describe('Server path: /video/:id', () => {
  beforeEach(connectDatabase);

  afterEach(disconnectDatabase);

  // Write your test blocks below:
  describe('GET', () => {
    it('correct video rendered', async () => {
      const newVideo = await seedItemToDatabase();
      const videoUrl = '/video/' + newVideo._id.toString();

      const response = await request(app)
        .get(videoUrl);

      assert.equal(response.status, 200);
      assert.include(parseTextFromHTML(response.text, '#item-title'), newVideo.title);
      assert.include(parseTextFromHTML(response.text, '#item-description'), newVideo.description);
    })
  })

});