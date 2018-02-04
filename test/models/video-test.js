const Video = require('../../models/video')
const { assert } = require('chai');
const { mongoose, databaseUrl, options } = require('../../database');

// async function connectDatabase() {
//   await mongoose.connect(databaseUrl, options);
//   await mongoose.connection.db.dropDatabase();
// }

// async function disconnectDatabase() {
//   await mongoose.disconnect();
// }

describe('Video Model ->', () => {
  beforeEach(async () => {
    await mongoose.connect(databaseUrl, options);
    await mongoose.connection.db.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });
  describe('#Title ->', () => {
    it('is a String', () => {
      const integerTitle = 9;
      const video = new Video({ title: integerTitle });

      assert.strictEqual(video.title, integerTitle.toString());
    })
  });
});

// module.exports = {
//   connectDatabase,
//   disconnectDatabase,
// }