const app = require('../app'); // adjust the path if needed

describe('GET /api/welcome', () => {
    it('should return "Hello World"', (done) => {
        request(app)
            .get('/api/welcome')
            .expect(200) // Expect a 200 OK status
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.equal('Hello World');
                done(); // Call done() for asynchronous tests
            });
    });
});