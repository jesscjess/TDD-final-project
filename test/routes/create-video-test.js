// Step 1 create the default files for this level for testing
// Step 2 have examples show what you can do with app to make simple tests
// 
// Can explain this in docs
// 
// Create easy way to add tests that provide specific information
// 
// should we look into chai-webdriver or is chai enough?? 
const { assert } = require('chai');
const request = require('supertest');
const { jsdom } = require('jsdom');

const app = require('../../app');
const Video = require('../../models/video');

const { parseTextFromHTML, buildItemObject } = require('../test-helper-funcs');
const { connectDatabase, disconnectDatabase } = require('../db-helper-funcs');


describe('Server path: /videos/create ->', () => {

  beforeEach(connectDatabase);

  afterEach(disconnectDatabase);

  describe('POST ->', () => {
    it('create new video', async () => {
      const newVideo = buildItemObject();
      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(newVideo);

        const createdItem = await Video.findOne(newVideo);
        assert.equal(response.status, 302);
        assert.isOk(createdItem, 'Looks like item was not created successfully in the database');
    });

    it('cannot create video with NO title', async () => {
      const newVideo = buildItemObject();
      newVideo.title = '';
      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(newVideo);

        assert.deepEqual(await Video.find({}), []);
        assert.equal(response.status, 400);
        assert.include(parseTextFromHTML(response.text, 'form'), 'Path `title` is required.');
        assert.include(parseTextFromHTML(response.text, 'form'), newVideo.description);
    });

  });

});
