const request = require("supertest");
const baseUrl = 'http://localhost:8579/';

describe('levels endpoint', () => {
	test("GET /levels/id", (done) => {
    request(baseUrl)
      .get("levels/7ed29c50-9fbb-4b45-80f6-bfd3acfbf63e")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        res.body.data.id = "7ed29c50-9fbb-4b45-80f6-bfd3acfbf63e";
        res.body.data.version = "1.0.0";
				res.body.data.blocks[1].x = 1;
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});