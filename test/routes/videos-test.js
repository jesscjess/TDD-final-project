const { assert } = require('chai');
const request = require('supertest');
const { jsdom } = require('jsdom');

const app = require('../../app');
const Video = require('../../models/video');

const { parseTextFromHTML, seedItemToDatabase } = require('../test-helper-funcs');
const { connectDatabase, disconnectDatabase } = require('../db-helper-funcs');


describe('Server path: /videos ->', () => {

  beforeEach(connectDatabase);

  afterEach(disconnectDatabase);

  describe('GET ->', () => {
    it('existing videos show on the landing page', async () => {
      const newItem = await seedItemToDatabase();

      const response = await request(app)
        .get('/videos');

        assert.include(parseTextFromHTML(response.text, '.video-title'), newItem.title);
    });
  });
});