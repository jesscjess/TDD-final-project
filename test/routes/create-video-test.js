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
      const itemToCreate = buildItemObject();
      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(itemToCreate);

        const createdItem = await Video.findOne(itemToCreate);
        assert.isOk(createdItem, 'Looks like item was not created successfully in the database');
    });

    it('cannot create video with NO title', async () => {
      const itemToCreate = buildItemObject();
      itemToCreate.title = '';
      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(itemToCreate);

        assert.deepEqual(await Video.find({}), []);
        assert.equal(response.status, 400);
        assert.include(parseTextFromHTML(response.text, 'form'), 'Path `title` is required.');
        assert.include(parseTextFromHTML(response.text, 'form'), itemToCreate.description);
    });

    it('new video data returned', async () => {
      const itemToCreate = buildItemObject();
      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(itemToCreate);

        assert.include(parseTextFromHTML(response.text, 'body'), itemToCreate.title);
        assert.include(parseTextFromHTML(response.text, 'body'), itemToCreate.description);
    });

  });

});

/*
We still have a failing feature level test. At the server level, add a corresponding assertion to your server test. It should check that after a POST to '/videos' with a title and description, the response contains the video details.

Write the minimum implementation within routes/videos.js to pass this test. Note that you don't necessarily need to save the video to the database to pass this test.

You should now have a fully green test suite! Congrats!*/