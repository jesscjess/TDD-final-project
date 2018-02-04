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
const { connectDatabaseAndDropData, diconnectDatabase } = require('../setup-teardown-db-helper-funcs');


describe('Server path: /videos/create ->', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('POST ->', () => {
    it('create new video', async () => {
      const itemToCreate = {title: 'Some title', description: 'some desc....'};
      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(itemToCreate);

        const createdItem = await Video.findOne(itemToCreate);
        assert.isOk(createdItem, 'Looks like item was not created successfully in the database');
    });

  });

});